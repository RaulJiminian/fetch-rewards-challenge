import { insertionSort } from "../helpers.js/insertion.js";

const queue = [];

export const addPoints = (req, res) => {
  const { payer, points } = req.body;

  // Previous Iteration commented out for comparison purposes only
  // let found = queue.find((current) => {
  //   if (current.payer === payer) {
  //     current.points += points;
  //     return current;
  //   }
  // });

  // if (!found) {
  //   queue.push(req.body);
  //   insertionSort(queue);
  // }

  if (points > 0) {
    queue.push(req.body);
    insertionSort(queue);
  } else {
    res.status(400).send("Cannot enter a negative balance for points");
  }

  res.json(queue);
};

export const spendPoints = (req, res) => {
  let { points } = req.body;

  if (points < 0) {
    res.status(400).send("Points cannot be negative.");
  }

  const list = [];

  queue.forEach((currentPayer) => {
    if (points === 0) return;

    if (currentPayer.points > 0) {
      if (points < currentPayer.points) {
        list.push({
          payer: currentPayer.payer,
          points: -points,
        });

        currentPayer.points -= points;
        points = 0;
      } else if (currentPayer.points < points) {
        list.push({
          payer: currentPayer.payer,
          points: -currentPayer.points,
        });

        points -= currentPayer.points;
        currentPayer.points = 0;
      } else {
        list.push({
          payer: currentPayer.payer,
          points: -points,
        });

        currentPayer.points = 0;
        points = 0;
      }
    }
  });

  if (list.length === 0) {
    res.status(400).send("No transactions presents. Please add transactions before spending points");
  }

  res.json(list);
};

export const getPoints = (req, res) => {
  const balance = {};

  queue.forEach((currentPayer) => {
    let { payer, points } = currentPayer;

    balance[payer] = (balance[payer] || 0) + points;
  });

  res.json(balance);
};
