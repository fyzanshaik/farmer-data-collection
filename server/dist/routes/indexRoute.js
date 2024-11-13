"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const pingController_1 = require("../controllers/pingController");
const router = (0, express_1.Router)();
router.get('/ping', pingController_1.pingController);
exports.default = router;
