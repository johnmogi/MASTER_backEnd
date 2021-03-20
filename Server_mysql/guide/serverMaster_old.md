{DB:utf8_gen_ci} [Linux bug: prevent by making all fields lowercase]

utf8 general bin
id _ primary ai / re
review id as index id index / restId as primary + null as default + null checkbox [take notice, second primary not AI not Null] מצאתי את הפתרון- עקום אבל עובד, לא לתת אינדקס על הטבלה השנייה ורק אחרי היצירה לשים- מקווה שזה יעבוד כמו שצריך
attach id on designer 5.add data manually
{SERVER}

mkdir server + cd server

app.js

npm init -y

npm i express mysql cors joi

dep. folder logic:
a. dal (data access layer) express db access b. buisness logic- resto logic ( get all, get one, CRUD) c. controllers - resto controller ( get. post, routing) d. app. js - (exspress, connection, server use)

DAL - make sql connection with promise and export:
const mysql = require("mysql"); const connection = mysql.createConnection({ host: "localhost", user: "root", password: "q1w2e3", database: "restotasks" }); connection.connect(err => { if (err) { console.error(err); return; } console.log("We're connected to restotasks on MySQL."); }); function executeAsync(sql) { return new Promise((resolve, reject) => { connection.query(sql, (err, result) => { if (err) { reject(err); return; } resolve(result); }); }); } module.exports = { executeAsync };

BLL - "export" the sql query as in crud:
const dal = require("../data-access-layer/dal"); async function getAllRestsAsync() { const sql = "SELECT * FROM restaurants"; const restos = await dal.executeAsync(sql); return restos; } module.exports = { getAllRestsAsync }

CTRL - use the router so that the sql query will be submitted on a url:
const express = require("express"); const restsLogic = require("../business-logic-layer/rest-logic"); const router = express.Router(); // GET http://localhost:3000/api/products router.get("/restos", async (request, response) => { try { const rests = await restsLogic.getAllRestsAsync(); response.json(rests); } catch (err) { response.status(500).send(err.message); } }); module.exports = router;

app.js connect the cors + listen to the server with express and the controller:
const express = require("express"); const cors = require("cors"); const restController = require("./controllers/resto-controller"); const server = express(); server.use(cors()); server.use(express.json()); server.use("/api", restController); server.listen(3100, () => console.log("Listening on http://localhost:3100"));

make sure all folders and applications are spelled correctly

test the first api call with postman- plan ahead- are there additional routes?

DB extended notes:
[if there's a secondary primary id on the 2nd table - it won't accept null- allways send an added value] join tables simplified: SELECT * FROM reviews JOIN restaurants ON restId= id join tables extended: SELECT S.id, S.employeeID, S.date, S.salary, E.firstName, E.lastName FROM Salaries as S JOIN Employees as E ON E.id = S.employeeID restCode``restId``date``visitor``review select r.restCode, r.restId, r.date, r.visitor, r.review, s.restname from reviews as r join restaurants as s on r.id = s.id

add an item with ID:
async function addSalaryAsync(salary) { const sql = INSERT INTO Salaries(employeeID, Date, Salary) VALUES(${salary.employeeID},'${salary.date}',${salary.salary}); const info = await dal.executeAsync(sql); salary.id = info.insertId; return salary; }

final output: insert...
async function addReviewAsync(review) { const sql = INSERT INTO reviews(restCode,date, visitor, review) VALUES(${review.restCode},'${review.date}',${review.visitor},${review.review}); const info = await dal.executeAsync(sql); review.id = info.insertId; return review; }

MAKE sure strings are marked with single quote- or it won't post:
async function addReviewAsync(review) { const sql = INSERT INTO reviews(restCode,date, visitor, review) VALUES(${review.restCode},'${review.date}','${review.visitor}','${review.review}'); const info = await dal.executeAsync(sql); review.id = info.insertId; return review; }

id extra fiber: [controller] router.get("/books/:id/photos", async (request, response) => { try { const id = +request.params.id; const photos = await factoryLogic.getAllPhotosAsync(id); response.json(photos); } catch (err) { response.status(500).send(err.message); } });

xtra logic(id):
async function getEmployeeSalariesAsync(id) { const sql = SELECT S.id, S.employeeID, S.date, S.salary, E.firstName, E.lastName FROM Salaries as S JOIN Employees as E ON E.id = S.employeeID WHERE S.employeeID = ${id}; const salaries = await dal.executeAsync(sql); return salaries; }

insert into (id):
async function addSalaryAsync(salary) { const sql = INSERT INTO Salaries(employeeID, Date, Salary) VALUES(${salary.employeeID},'${salary.date}',${salary.salary}); const info = await dal.executeAsync(sql); salary.id = info.insertId; return salary; } async function addReviewAsync(rev) { const sql = INSERT INTO reviews (restId, visitor,date, review) VALUES (${rev.restId}, '${rev.visitor}', '${rev.date}', '${rev.review}'); const restos = await dal.executeAsync(sql); return restos; }

CTRL:
router.post("/reviews", async (request, response) => { try { const review = request.body; const addedReview = await restsLogic.addReviewAsync(review); response.status(201).json(addedReview); } catch (err) { response.status(500).send(err.message); } });

add important parts: DATE_FORMAT(gameDate, "%m/%d/%Y %H:%i") as

npm i express-session

DELETE- router.delete("/vacations/:id", async (request, response) => { try { const id = +request.params.id; const vac = await vacsLogic.deleteOneVacAsync(id); response.json(vac); } catch (err) { response.status(200); } });

yet another table join: SELECT T.bookName, U.reviewid, U.userName, U.review, U.reviewDate, U.bookID FROM userRating as U JOIN titles as T