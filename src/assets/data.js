const users = [
  { id: "1", fullname: "Buket Soyhan" },
  { id: "2", fullname: "Asli Demirci" },
];

const posts = [
  { id: "1", title: "Buketin gönderisi", user_id: "1" },
  { id: "2", title: "Buketin bir diğer gönderisi", user_id: "1" },
  { id: "3", title: "Aslinin gönderisi", user_id: "2" },
];

const comments = [
  {
    id: "1",
    text: "Buketin 1 idli gönderisi için Buketin yorumu",
    post_id: "1",
    user_id: "1",
  },
  {
    id: "2",
    text: "Buketin 1 idli gönderisi için Aslinin yorumu",
    post_id: "1",
    user_id: "2",
  },
  {
    id: "3",
    text: "Buketin 2 idli gönderisi için Buketin diğer yorumu",
    post_id: "2",
    user_id: "1",
  },
  {
    id: "4",
    text: "Aslinin 3 idli gönderisi için Buketin yorumu",
    post_id: "3",
    user_id: "1",
  },
];

export { users, posts, comments };
