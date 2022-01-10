import { insertionSort } from "../helpers.js/insertion.js";

const queue = [];

export const addPoints = (req, res) => {
  const { payer, points } = req.body;

  let found = queue.find((current) => {
    if (current.payer === payer) {
      current.points += points;
      return current;
    }
  });

  if (!found) {
    queue.push(req.body);
    insertionSort(queue);
  }

  res.json(queue);
};

export const spendPoints = (req, res) => {
  let { points } = req.body;
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

  res.json(list);
};

export const getPoints = (req, res) => {
  const balance = {};

  queue.forEach((currentPayer) => {
    let { payer, points } = currentPayer;
    balance[payer] = points;
  });

  res.json(balance);
};
