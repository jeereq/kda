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
      type: "string",
      initialValue:
        "https://cdn.sanity.io/images/96u1hx5i/production/149e6bfdb5f26188303f1e426f6145151052d136-1620x2880.jpg",
    },
    {
      name: "email",
      title: "Email",
      type: "string",
      initialValue: "mingandajeereq@gmail.com",
    },
  ],
};
