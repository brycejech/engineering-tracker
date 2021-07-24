export default function createCounter(initial = 0): () => number {
  let count = initial;
  return function counter(): number {
    return ++count;
  };
}
