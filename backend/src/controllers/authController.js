
import { upsertStreamUser } from "../lib/stream.js";
import User from "../models/User.js"
import jwt from "jsonwebtoken"
export async function signup(req,res){
  
    const {email,password,fullName}=req.body;
    try {
      if(!email || !password || !fullName){
        return res.status(400).json({message:"All fields are required"});
      }
      if(password.length<6){
        return res.status(400).json({message:"Password must be at least 6 characters"});
      }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({ message: "Invalid email format" });
      }
      const existingUser=await User.findOne({email});
      if(existingUser){
        return res.status(400).json({message:"Email already exists , please use a different one"})
      }
      const  idx=Math.floor(Math.random()*100)+1;
      const randomAvatar = `https://avatar.iran.liara.run/public/${idx}.png`;
      const newUser=await User.create({
        email,
        fullName,
        password,
        profilePic:randomAvatar,
      })

      try{
        await upsertStreamUser({
          id: newUser._id.toString(),
          name: newUser.fullName,
          image: newUser.profilePic || "",
        });
        console.log("stream user created");
        

      }catch(err){
        console.log("error creating stream user");
      }


      //creating user in string 



      const  token=jwt.sign({
        userId:newUser._id
      },process.env.JWT_SECRET_KEY);
      res.cookie("jwt", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 200 * 24 * 60 * 60 * 1000, // 200 days
      });
      res.status(201).json({success:true,user:newUser});

      
    } catch (error) {
      console.log("Error in signup controller",error);
      res.status(500).json({message:"Internal Server Error"});
    }
}
export async function login(req, res) {
  try {
    const {email,password}=req.body;
    if(!email || !password){
      return res.status(400).json({message:"All fields are required"});
    }
    const user=await User.findOne({email});
    if(!user) return res.status(401).json({message:"Invalid email or password"});
    const isPasswordCorrect=await user.matchPassword(password);
    if(!isPasswordCorrect) return  res.status(401).json({message:"Invalid email or password"});
    const token = jwt.sign(
      {
        userId: user._id,
      },
      process.env.JWT_SECRET_KEY
    );
    res.cookie("jwt", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 200 * 24 * 60 * 60 * 1000, // 200 days
    });
    res.status(200).json({success:true,user});

    
  } catch (err) {
    console.log("Error in login controller",err.message);
    res.status(500).json({message:"Internal Server Error"});

    
  }
}
export function logout(req, res) {
  res.clearCookie("jwt");
  res.status(200).json({success:true,message:"Logout Successful"});
}

export async function onboard(req,res){
  try {
    const userId=req.user._id;
    const {fullName,bio,nativeLanguage,learningLanguage,location}=req.body;
    if(! fullName || !bio || !nativeLanguage || !learningLanguage || !location){
      return res.status(400).json({
        message:"All fields are required",
        missingFields:[
          !fullName && "fullName",
          !bio && "bio",
          !nativeLanguage && "nativeLanguage",
          !learningLanguage && "learningLanguage",
          !location && "location",
        ].filter(Boolean),
      })
    }
    const updatedUser=await User.findByIdAndUpdate(userId,{
      ...req.body,
      isOnboarded:true
    },{new:true});
    if(!updatedUser){
      return res.status(401).json({message:"User not found onboard"})
    }

    //updating user in stream
    try {
      await upsertStreamUser({
        id: updatedUser._id.toString(),
        name: updatedUser.fullName,
        image: updatedUser.profilePic || "",
      });
      console.log("stream user updated");
    } catch (err) {
      console.error("upserting error:", err);
      res.status(500).json({ message: "Internal Server Error" });
      

    }
    res.status(200).json({success:true,user:updatedUser});
    
  } catch (err) {

    console.error("Onboarding error:",err);
    res.status(500).json({message:"Internal Server Error"});
    
  }
}