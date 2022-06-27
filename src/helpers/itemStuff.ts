export async function randomBreak(items: String[], percentage: number) {
  const randomitem = items[Math.floor(Math.random() * items.length)];
  const random = Math.floor(Math.random() * 100) + 1;
  console.log(`Debug: ${randomitem}, ${random}`);
  if (random <= percentage) return randomitem;
  else return null;
}
