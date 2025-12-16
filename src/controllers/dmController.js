import { sendResponse } from "../utils/sendResponse.js";

export const getDms = async (req, res) => {
  const dmsCollection = req.client.channels.cache
    .filter((c) => c.type === "DM" || c.type === "GROUP_DM")
    .filter((c) => {
      if (c.type === "GROUP_DM") return true;
      if (!c.recipient.bot) return true;
    });

  const dms = [...dmsCollection.values()].map((d) => {
    let name, avatar;

    if (d.type === "DM") {
      name = d.recipient.globalName || d.recipient.username;
      avatar = d.recipient.avatarURL();
    }

    if (d.type === "GROUP_DM") {
      name =
        d.name ||
        [...d.recipients.values()]
          .map((r) => r.globalName || r.username)
          .join(", "); // .name prop exists only in case of group dm, for deleted username global name is null
      avatar = d.recipients.first().avatarURL();
    }
    const data = {
      id: d.id,
      type: d.type,
      name: name,
      avatar,
    };

    return data;
  });

  sendResponse(req, res, dms);
};
