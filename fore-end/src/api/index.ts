// 前后端接口在这定义
import service from "@/utils/axios";
import type { NumberLiteralType } from "typescript";

interface insertwallType {
  type: number;
  message: string;
  name: string;
  userId: string;
  moment: string;
  label: number;
  color: number;
  imgurl: string;
}

interface insertfeedbackType {
  wallId: number;
  userId: string;
  type: number;
  moment: string;
}

interface insertcommentType {
  wallId: number;
  userId: string;
  imgurl: string;
  comment: string;
  name: string;
  moment: string;
}

interface querywallType {
  page: number;
  pagesize: number;
  type: number;
  label: number;
  userId: string;
}

interface querycommentType {
  page: number;
  pagesize: number;
  wallId: number;
}

const signIpApi = () => service.post("/signip");

const insertWallApi = (data: insertwallType) =>
  service.post("/insertwall", data);

const insertFeedbackApi = (data: insertfeedbackType) =>
  service.post("/insertfeedback", data);

const insertCommentApi = (data: insertcommentType) =>
  service.post("/insertcomment", data);

const queryWallPageApi = (data: querywallType) =>
  service.post("/querywallpage", data);

const queryCommentPageApi = (data: querycommentType) =>
  service.post("/querycommentpage", data);

const deleteFeedbackApi = (data: { wallId: number }) =>
  service.post("/deletefeedback", data);

const apiManager = {
  signIpApi,
  insertWallApi,
  insertFeedbackApi,
  insertCommentApi,
  queryWallPageApi,
  queryCommentPageApi,
  deleteFeedbackApi,
};

export default apiManager;
