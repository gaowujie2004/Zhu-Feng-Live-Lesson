// base64
// 0000 1111  1001 1001    3 * 8 -> 24位
// __00 1100  __00 1001  __   转成 4 * 6

// _ _ 00 0000

// 3*8 = 4*6

// 2 ** 6

// 26 + 26 -> 52,
// 0-9 -> 10
// +/ -> 2

// 通过ASCII字符，表达二进制数据。

// 3 * 8
// 为什么 不用 3*8 这样的呢？
// 这样就需要 255 个字符了，但是字母（大小写）加数字也没那么多啊

// base32

var a = 2 ** 5; // 32
// _ _ _ 0 1111
// 26 +
