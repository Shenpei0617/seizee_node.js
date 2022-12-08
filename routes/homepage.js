const express = require("express");
const router = express.Router();
const db = require(__dirname + "/../modules/db_connect");
const cors = require("cors");
//const { application } = require("express");

// 跑馬燈
// shopNews 要等論壇部分sql更新後再來修改
router.get("/news-crawl", async (req, res) => {
  const recipeNews =
    "SELECT * FROM `forum_cooking_post` JOIN `member` ON `forum_cooking_post`.`member_sid` = `member`.`mb_sid` ORDER BY `forum_cooking_post`.`sid` LIMIT 1";
  const [recipeNewsRow] = await db.query(recipeNews);

  const eventNews = "SELECT * FROM `event_all` ORDER BY `sid` DESC LIMIT 1";
  const [eventNewsRow] = await db.query(eventNews);

  const seizeeNews =
    "SELECT * FROM `forum_official_post` ORDER BY `sid` LIMIT 1";
  const [seizeeNewsRow] = await db.query(seizeeNews);

  const shopNews =
    "SELECT * FROM `forum_store_post` ORDER BY `sid` DESC LIMIT 1";
  const [shopNewsRow] = await db.query(shopNews);

  const newsCrawlRows = {
    recipeNewsRow: recipeNewsRow[0],
    eventNewsRow: eventNewsRow[0],
    seizeeNewsRow: seizeeNewsRow[0],
    shopNewsRow: shopNewsRow[0],
  };

  res.json(newsCrawlRows);
});

// 首頁最新貼文
// 食譜
router.get("/recipe-posts", async (req, res) => {
  const recipePost =
    "SELECT * FROM `forum_cooking_post` JOIN `member` ON `forum_cooking_post`.`member_sid` = `member`.`mb_sid` ORDER BY `forum_cooking_post`.`sid`";
  const [recipePostRows] = await db.query(recipePost);

  res.json({ recipePostRows });
});

// 商家推薦（可能會換成另一頻道）
router.get("/shop-posts", async (req, res) => {
  const shopPost =
    "SELECT * FROM `forum_share_post` JOIN `member` ON `forum_share_post`.`member_sid` = `member`.`mb_sid` ORDER BY `forum_share_post`.`sid` DESC";
  const [shopPostRows] = await db.query(shopPost);

  res.json({ shopPostRows });
});

// 官方貼文
router.get("/official-posts", async (req, res) => {
  const officialPost =
    "SELECT * FROM `forum_official_post` ORDER BY `sid` DESC";
  const [officialPostRows] = await db.query(officialPost);

  res.json({ officialPostRows });
});

//活動 banner資料列表
router.get("/event-banner", async (req, res) => {
  const event_sql = "SELECT * FROM `event_all` ORDER BY `sid` DESC";
  const [eventRows] = await db.query(event_sql);

  res.json({ eventRows });
});

//隨機扭蛋推薦
router.get("/ganchapon", async (req, res) => {
  const egg_sql = "SELECT * FROM `food_product` ORDER BY RAND() LIMIT 1";
  const [eggRows] = await db.query(egg_sql);

  res.json({ eggRows });
});

module.exports = router;
