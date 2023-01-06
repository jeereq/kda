// eslint-disable-next-line import/no-anonymous-default-export
export default {
  name: "user",
  title: "User",
  type: "document",
  fields: [
    {
      name: "userName",
      title: "UserName",
      type: "string",
    },
    {
      name: "image",
      title: "Image",
      type: "image",
      options: {
        hotspot: true,
      },
    },
    {
      name: "facebook",
      title: "Facebook",
      type: "string",
    },
    {
      name: "instagram",
      title: "Instagram",
      type: "string",
    },
    {
      name: "twitter",
      title: "Twitter",
      type: "string",
    },
    {
      name: "youtube",
      title: "YouTube",
      type: "string",
    },
    {
      name: "email",
      title: "Email",
      type: "string",
      validation: (Rule) =>
        Rule.custom((email) => {
          if (typeof email === "undefined") {
            return true;
          }
          return email
            .toLowerCase()
            .match(
              /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            )
            ? true
            : "This is not an email";
        }),
    },
  ],
};
