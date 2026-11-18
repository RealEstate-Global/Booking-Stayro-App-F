const fs = require('fs');
const content = fs.readFileSync('frontend/src/components/shared/logo.tsx', 'utf8');

const p1 = content.match(/MARK_PATH_1 =\s*"([^"]+)"/)[1];
const p2 = content.match(/MARK_PATH_2 =\s*"([^"]+)"/)[1];
const pw = content.match(/WORDMARK_PATH =\s*"([^"]+)"/)[1];

function parseBounds(d) {
  const commands = d.match(/[a-df-z][^a-df-z]*/ig);
  let curX = 0, curY = 0;
  let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
  function update(x, y) {
    if (x < minX) minX = x;
    if (x > maxX) maxX = x;
    if (y < minY) minY = y;
    if (y > maxY) maxY = y;
  }
  for (const cmd of commands) {
    const type = cmd[0];
    const nums = (cmd.slice(1).trim().match(/[-+]?[0-9]*\.?[0-9]+/g) || []).map(Number);
    if (type === 'M' || type === 'L') {
      for (let i = 0; i < nums.length; i += 2) {
        curX = nums[i]; curY = nums[i+1];
        update(curX, curY);
      }
    } else if (type === 'm' || type === 'l') {
      for (let i = 0; i < nums.length; i += 2) {
        curX += nums[i]; curY += nums[i+1];
        update(curX, curY);
      }
    } else if (type === 'H') {
      for (const x of nums) { curX = x; update(curX, curY); }
    } else if (type === 'h') {
      for (const dx of nums) { curX += dx; update(curX, curY); }
    } else if (type === 'V') {
      for (const y of nums) { curY = y; update(curX, curY); }
    } else if (type === 'v') {
      for (const dy of nums) { curY += dy; update(curX, curY); }
    } else if (type === 'C') {
      for (let i = 0; i < nums.length; i += 6) {
        update(nums[i], nums[i+1]);
        update(nums[i+2], nums[i+3]);
        curX = nums[i+4]; curY = nums[i+5];
        update(curX, curY);
      }
    } else if (type === 'c') {
      for (let i = 0; i < nums.length; i += 6) {
        update(curX + nums[i], curY + nums[i+1]);
        update(curX + nums[i+2], curY + nums[i+3]);
        curX += nums[i+4]; curY += nums[i+5];
        update(curX, curY);
      }
    }
  }
  return { minX, maxX, minY, maxY };
}

const b1 = parseBounds(p1);
const b2 = parseBounds(p2);
const bw = parseBounds(pw);

console.log('Path 1:', b1);
console.log('Path 2:', b2);
console.log('Combined Mark:', {
  minX: Math.min(b1.minX, b2.minX),
  maxX: Math.max(b1.maxX, b2.maxX),
  minY: Math.min(b1.minY, b2.minY),
  maxY: Math.max(b1.maxY, b2.maxY)
});
console.log('Wordmark:', bw);
console.log('Full Logo:', {
  minX: Math.min(b1.minX, b2.minX, bw.minX),
  maxX: Math.max(b1.maxX, b2.maxX, bw.maxX),
  minY: Math.min(b1.minY, b2.minY, bw.minY),
  maxY: Math.max(b1.maxY, b2.maxY, bw.maxY)
});
