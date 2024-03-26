import { test, expect } from 'vitest';
import { createEmptyBoard, getWinner } from '../game';
import { Board, Markers } from '../../types';

test('returns the correct winner for a winning row', () => {
  const board: Board = [
    [Markers.X, Markers.X, Markers.X],
    [Markers.O, Markers.O, undefined],
    [undefined, undefined, undefined]
  ];
  expect(getWinner(board)).toEqual({
    winner: Markers.X,
    winningCombination: {
      direction: 'row',
      index: 0
    }
  });
});

test('returns the correct winner for a winning column', () => {
  const board: Board = [
    [Markers.X, Markers.O, undefined],
    [Markers.X, Markers.O, undefined],
    [Markers.X, undefined, undefined]
  ];
  expect(getWinner(board)).toEqual({
    winner: Markers.X,
    winningCombination: {
      direction: 'column',
      index: 0
    }
  })
});

test('returns the correct winner for a winning diagonal', () => {
  const board: Board = [
    [Markers.X, Markers.O, undefined],
    [undefined, Markers.X, undefined],
    [undefined, undefined, Markers.X]
  ];
  expect(getWinner(board)).toEqual({
    winner: Markers.X,
    winningCombination: {
      direction: 'diagonal',
      index: 0
    }
  });
});

test('returns the correct winner for when O wins', () => {
  const board: Board = [
    [Markers.X, Markers.X, undefined],
    [Markers.O, Markers.O, Markers.O],
    [undefined, undefined, undefined]
  ];
  expect(getWinner(board)).toEqual({
    winner: Markers.O,
    winningCombination: {
      direction: 'row',
      index: 1
    }
  });
});


test('returns undefined for a tie game', () => {
  const board: Board = [
    [Markers.X, Markers.O, Markers.X],
    [Markers.O, Markers.X, Markers.O],
    [Markers.O, Markers.X, Markers.O]
  ];
  expect(getWinner(board)).toBe(undefined);
});

test('returns undefined for an empty board', () => {
  const board: Board = createEmptyBoard();
  expect(getWinner(board)).toBe(undefined);
});