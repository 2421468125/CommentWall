interface WallType {
  name: string;
  slogan: string;
}

export const wallType: Record<string, WallType> = {
  CW: {
    name: "留言墙",
    slogan: "很多事情值得记录，当然也值得回味",
  },
  PW: {
    name: "照片墙",
    slogan: "很多事情值得记录，当然也值得回味",
  },
};

export const label: Record<string, Array<string>> = {
  CW: [
    "留言",
    "目标",
    "理想",
    "过去",
    "未来",
    "爱情",
    "亲情",
    "友情",
    "秘密",
    "信条",
    "无言",
  ],
  PW: [
    "我",
    "Ta",
    "喜欢的",
    "有意义的",
    "值得纪念的",
    "母校",
    "生活",
    "天空",
    "城市",
    "大海",
  ],
};

export const cardColor: Array<string> = [
  "rgba(39, 169, 233, 0.3)", // 示例颜色
  "rgba(255,99,71,0.3)", // Tomato
  "rgba(135,206,235,0.3)", // SkyBlue
  "rgba(144,238,144,0.3)", // LightGreen
  "rgba(255,182,193,0.3)", // LightPink
  "rgba(255,165,0,0.3)", // Orange
  "rgba(173,216,230,0.3)", // LightBlue
  "rgba(221,160,221,0.3)", // Plum
  "rgba(240,230,140,0.3)", // Khaki
  "rgba(255,228,181,0.3)", // Moccasin
  "rgba(100 ,100, 100, 0.3)",
];

export const portraitColor: Array<string> = [
  "linear-gradient(180deg, #48d0da 50%, #b2f0f0)",
  "linear-gradient(180deg, #ff9a9e 0%, #fecfef 99%, #fecfef 100%)",
  "linear-gradient(180deg, #a18cd1 0%, #fbc2eb 100%)",
  "linear-gradient(180deg, #fad0c4 0%, #ffd1ff 100%)",
  "linear-gradient(180deg, #ffecd2 0%, #fcb69f 100%)",
  "linear-gradient(180deg, #ff9a9e 0%, #ffdde1 100%)",
  "linear-gradient(180deg, #a1c4fd 0%, #c2e9fb 100%)",
  "linear-gradient(180deg, #d4fc79 0%, #96e6a1 100%)",
  "linear-gradient(180deg, #84fab0 0%, #8fd3f4 100%)",
  "linear-gradient(180deg, #a6c0fe 0%, #f68084 100%)",
  "linear-gradient(180deg, #fccb90 0%, #d57eeb 100%)",
  "linear-gradient(180deg, #e0c3fc 0%, #8ec5fc 100%)",
];
