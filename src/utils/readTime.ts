/**
 * 估算阅读时间（中文约 300 字/分钟）
 */
export function readTime(content: string): number {
  // 去掉空白和 markdown 标记，粗略计算中文字符数
  const text = content.replace(/\s+/g, '').replace(/[#*`\[\]()>_\-|]/g, '');
  const charsPerMinute = 300;
  const minutes = Math.max(1, Math.ceil(text.length / charsPerMinute));
  return minutes;
}
