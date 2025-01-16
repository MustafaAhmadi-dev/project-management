import { Router } from "express";
import { getTeams } from "../controllers/teamController";

const route = Router();

route.get("/", getTeams);

export default route;
