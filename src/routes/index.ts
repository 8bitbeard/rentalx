import { Router } from "express";

import { categoriesRoute } from "./categories.routes";
import { specificationsRoutes } from "./specifications.routes";
import { usersRoutes } from "./users.routes";

const router = Router();

router.use("/categories", categoriesRoute);
router.use("/specifications", specificationsRoutes);
router.use("/users", usersRoutes);

export { router };
