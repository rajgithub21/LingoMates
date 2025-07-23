import express from "express"
import { protectRoute } from "../middleware/authMiddleware.js";
import { getRecommendedUsers} from "../controllers/userController.js";
import { getMyFriends } from "../controllers/userController.js";
import { sendFriendRequest } from "../controllers/userController.js";
import { acceptFriendRequest } from "../controllers/userController.js";
import { getFriendRequest } from "../controllers/userController.js";
import { getOutgoingFriendReqs } from "../controllers/userController.js";

const router=express.Router();
router.use(protectRoute);

router.get("/",getRecommendedUsers);
router.get("/friends", getMyFriends);

router.post("/friend-request/:id" ,sendFriendRequest);
router.put("/friend-request/:id/accept", acceptFriendRequest);

router.get("/friend-requests", getFriendRequest);
router.get("/outgoing-friend-requests",getOutgoingFriendReqs);






export default router;