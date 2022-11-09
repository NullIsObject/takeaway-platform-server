//常用的类型
import { Request, Response, NextFunction } from "express";

type Middleware = (req: Request, res: Response, next: NextFunction) => void;
type ErrMiddleware = (err: any, req: Request, res: Response, next: NextFunction) => void;