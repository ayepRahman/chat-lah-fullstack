import { Request, Response } from "express";

export interface RequestProps extends Request {}
export interface ResponseProps extends Response {}

export interface ContextProps {
  req: RequestProps;
  res: ResponseProps;
}
