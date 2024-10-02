!(function () {
  "use strict"
  const t = []
  for (let e = 0; 256 > e; e++) {
    let n = e
    for (let t = 0; 8 > t; t++) 1 & n ? (n = (n >>> 1) ^ 3988292384) : (n >>>= 1)
    t[e] = n
  }
  class e {
    constructor(t) {
      this.crc = t || -1
    }
    append(e) {
      let n = 0 | this.crc
      for (let i = 0, a = 0 | e.length; a > i; i++) n = (n >>> 8) ^ t[255 & (n ^ e[i])]
      this.crc = n
    }
    get() {
      return ~this.crc
    }
  }
  const n = {
      concat(t, e) {
        if (0 === t.length || 0 === e.length) return t.concat(e)
        const i = t[t.length - 1],
          a = n.getPartial(i)
        return 32 === a ? t.concat(e) : n._shiftRight(e, a, 0 | i, t.slice(0, t.length - 1))
      },
      bitLength(t) {
        const e = t.length
        if (0 === e) return 0
        const i = t[e - 1]
        return 32 * (e - 1) + n.getPartial(i)
      },
      clamp(t, e) {
        if (32 * t.length < e) return t
        const i = (t = t.slice(0, Math.ceil(e / 32))).length
        return (e &= 31), i > 0 && e && (t[i - 1] = n.partial(e, t[i - 1] & (2147483648 >> (e - 1)), 1)), t
      },
      partial: (t, e, n) => (32 === t ? e : (n ? 0 | e : e << (32 - t)) + 1099511627776 * t),
      getPartial: (t) => Math.round(t / 1099511627776) || 32,
      _shiftRight(t, e, i, a) {
        for (void 0 === a && (a = []); e >= 32; e -= 32) a.push(i), (i = 0)
        if (0 === e) return a.concat(t)
        for (let n = 0; n < t.length; n++) a.push(i | (t[n] >>> e)), (i = t[n] << (32 - e))
        const r = t.length ? t[t.length - 1] : 0,
          s = n.getPartial(r)
        return a.push(n.partial((e + s) & 31, e + s > 32 ? i : a.pop(), 1)), a
      },
    },
    i = {
      bytes: {
        fromBits(t) {
          const e = n.bitLength(t) / 8,
            i = new Uint8Array(e)
          let a
          for (let n = 0; e > n; n++) 0 == (3 & n) && (a = t[n / 4]), (i[n] = a >>> 24), (a <<= 8)
          return i
        },
        toBits(t) {
          const e = []
          let i,
            a = 0
          for (i = 0; i < t.length; i++) (a = (a << 8) | t[i]), 3 == (3 & i) && (e.push(a), (a = 0))
          return 3 & i && e.push(n.partial(8 * (3 & i), a)), e
        },
      },
    },
    a = {
      sha1: function (t) {
        t ? ((this._h = t._h.slice(0)), (this._buffer = t._buffer.slice(0)), (this._length = t._length)) : this.reset()
      },
    }
  a.sha1.prototype = {
    blockSize: 512,
    reset: function () {
      const t = this
      return (t._h = this._init.slice(0)), (t._buffer = []), (t._length = 0), t
    },
    update: function (t) {
      const e = this
      "string" == typeof t && (t = i.utf8String.toBits(t))
      const a = (e._buffer = n.concat(e._buffer, t)),
        r = e._length,
        s = (e._length = r + n.bitLength(t))
      if (s > 9007199254740991) throw Error("Cannot hash more than 2^53 - 1 bits")
      const l = new Uint32Array(a)
      let o = 0
      for (let t = e.blockSize + r - ((e.blockSize + r) & (e.blockSize - 1)); s >= t; t += e.blockSize)
        e._block(l.subarray(16 * o, 16 * (o + 1))), (o += 1)
      return a.splice(0, 16 * o), e
    },
    finalize: function () {
      const t = this
      let e = t._buffer
      const i = t._h
      e = n.concat(e, [n.partial(1, 1)])
      for (let t = e.length + 2; 15 & t; t++) e.push(0)
      for (e.push(Math.floor(t._length / 4294967296)), e.push(0 | t._length); e.length; ) t._block(e.splice(0, 16))
      return t.reset(), i
    },
    _init: [1732584193, 4023233417, 2562383102, 271733878, 3285377520],
    _key: [1518500249, 1859775393, 2400959708, 3395469782],
    _f: (t, e, n, i) =>
      t > 19
        ? t > 39
          ? t > 59
            ? t > 79
              ? void 0
              : e ^ n ^ i
            : (e & n) | (e & i) | (n & i)
          : e ^ n ^ i
        : (e & n) | (~e & i),
    _S: (t, e) => (e << t) | (e >>> (32 - t)),
    _block: function (t) {
      const e = this,
        n = e._h,
        i = Array(80)
      for (let e = 0; 16 > e; e++) i[e] = t[e]
      let a = n[0],
        r = n[1],
        s = n[2],
        l = n[3],
        o = n[4]
      for (let t = 0; 79 >= t; t++) {
        16 > t || (i[t] = e._S(1, i[t - 3] ^ i[t - 8] ^ i[t - 14] ^ i[t - 16]))
        const n = (e._S(5, a) + e._f(t, r, s, l) + o + i[t] + e._key[Math.floor(t / 20)]) | 0
        ;(o = l), (l = s), (s = e._S(30, r)), (r = a), (a = n)
      }
      ;(n[0] = (n[0] + a) | 0),
        (n[1] = (n[1] + r) | 0),
        (n[2] = (n[2] + s) | 0),
        (n[3] = (n[3] + l) | 0),
        (n[4] = (n[4] + o) | 0)
    },
  }
  const r = "Invalid pasword",
    s = 16,
    l = { name: "PBKDF2" },
    o = Object.assign({ hash: { name: "HMAC" } }, l),
    _ = Object.assign({ iterations: 1e3, hash: { name: "SHA-1" } }, l),
    d = ["deriveBits"],
    c = [8, 12, 16],
    f = [16, 24, 32],
    u = 10,
    h = [0, 0, 0, 0],
    b = i.bytes,
    p = class {
      constructor(t) {
        const e = this
        ;(e._tables = [
          [[], [], [], [], []],
          [[], [], [], [], []],
        ]),
          e._tables[0][0][0] || e._precompute()
        const n = e._tables[0][4],
          i = e._tables[1],
          a = t.length
        let r,
          s,
          l,
          o = 1
        if (4 !== a && 6 !== a && 8 !== a) throw Error("invalid aes key size")
        for (e._key = [(s = t.slice(0)), (l = [])], r = a; 4 * a + 28 > r; r++) {
          let t = s[r - 1]
          ;(r % a == 0 || (8 === a && r % a == 4)) &&
            ((t = (n[t >>> 24] << 24) ^ (n[(t >> 16) & 255] << 16) ^ (n[(t >> 8) & 255] << 8) ^ n[255 & t]),
            r % a == 0 && ((t = (t << 8) ^ (t >>> 24) ^ (o << 24)), (o = (o << 1) ^ (283 * (o >> 7))))),
            (s[r] = s[r - a] ^ t)
        }
        for (let t = 0; r; t++, r--) {
          const e = s[3 & t ? r : r - 4]
          l[t] =
            4 >= r || 4 > t
              ? e
              : i[0][n[e >>> 24]] ^ i[1][n[(e >> 16) & 255]] ^ i[2][n[(e >> 8) & 255]] ^ i[3][n[255 & e]]
        }
      }
      encrypt(t) {
        return this._crypt(t, 0)
      }
      decrypt(t) {
        return this._crypt(t, 1)
      }
      _precompute() {
        const t = this._tables[0],
          e = this._tables[1],
          n = t[4],
          i = e[4],
          a = [],
          r = []
        let s, l, o, _
        for (let t = 0; 256 > t; t++) r[(a[t] = (t << 1) ^ (283 * (t >> 7))) ^ t] = t
        for (let d = (s = 0); !n[d]; d ^= l || 1, s = r[s] || 1) {
          let r = s ^ (s << 1) ^ (s << 2) ^ (s << 3) ^ (s << 4)
          ;(r = (r >> 8) ^ (255 & r) ^ 99), (n[d] = r), (i[r] = d), (_ = a[(o = a[(l = a[d])])])
          let c = (16843009 * _) ^ (65537 * o) ^ (257 * l) ^ (16843008 * d),
            f = (257 * a[r]) ^ (16843008 * r)
          for (let n = 0; 4 > n; n++) (t[n][d] = f = (f << 24) ^ (f >>> 8)), (e[n][r] = c = (c << 24) ^ (c >>> 8))
        }
        for (let n = 0; 5 > n; n++) (t[n] = t[n].slice(0)), (e[n] = e[n].slice(0))
      }
      _crypt(t, e) {
        if (4 !== t.length) throw Error("invalid aes block size")
        const n = this._key[e],
          i = n.length / 4 - 2,
          a = [0, 0, 0, 0],
          r = this._tables[e],
          s = r[0],
          l = r[1],
          o = r[2],
          _ = r[3],
          d = r[4]
        let c,
          f,
          u,
          h = t[0] ^ n[0],
          b = t[e ? 3 : 1] ^ n[1],
          p = t[2] ^ n[2],
          w = t[e ? 1 : 3] ^ n[3],
          x = 4
        for (let t = 0; i > t; t++)
          (c = s[h >>> 24] ^ l[(b >> 16) & 255] ^ o[(p >> 8) & 255] ^ _[255 & w] ^ n[x]),
            (f = s[b >>> 24] ^ l[(p >> 16) & 255] ^ o[(w >> 8) & 255] ^ _[255 & h] ^ n[x + 1]),
            (u = s[p >>> 24] ^ l[(w >> 16) & 255] ^ o[(h >> 8) & 255] ^ _[255 & b] ^ n[x + 2]),
            (w = s[w >>> 24] ^ l[(h >> 16) & 255] ^ o[(b >> 8) & 255] ^ _[255 & p] ^ n[x + 3]),
            (x += 4),
            (h = c),
            (b = f),
            (p = u)
        for (let t = 0; 4 > t; t++)
          (a[e ? 3 & -t : t] =
            (d[h >>> 24] << 24) ^ (d[(b >> 16) & 255] << 16) ^ (d[(p >> 8) & 255] << 8) ^ d[255 & w] ^ n[x++]),
            (c = h),
            (h = b),
            (b = p),
            (p = w),
            (w = c)
        return a
      }
    },
    w = class {
      constructor(t, e) {
        ;(this._prf = t), (this._initIv = e), (this._iv = e)
      }
      reset() {
        this._iv = this._initIv
      }
      update(t) {
        return this.calculate(this._prf, t, this._iv)
      }
      incWord(t) {
        if (255 == ((t >> 24) & 255)) {
          let e = (t >> 16) & 255,
            n = (t >> 8) & 255,
            i = 255 & t
          255 === e ? ((e = 0), 255 === n ? ((n = 0), 255 === i ? (i = 0) : ++i) : ++n) : ++e,
            (t = 0),
            (t += e << 16),
            (t += n << 8),
            (t += i)
        } else t += 1 << 24
        return t
      }
      incCounter(t) {
        0 === (t[0] = this.incWord(t[0])) && (t[1] = this.incWord(t[1]))
      }
      calculate(t, e, i) {
        let a
        if (!(a = e.length)) return []
        const r = n.bitLength(e)
        for (let n = 0; a > n; n += 4) {
          this.incCounter(i)
          const a = t.encrypt(i)
          ;(e[n] ^= a[0]), (e[n + 1] ^= a[1]), (e[n + 2] ^= a[2]), (e[n + 3] ^= a[3])
        }
        return n.clamp(e, r)
      }
    },
    x = class {
      constructor(t) {
        const e = this,
          n = (e._hash = a.sha1),
          i = [[], []],
          r = n.prototype.blockSize / 32
        ;(e._baseHash = [new n(), new n()]), t.length > r && (t = n.hash(t))
        for (let e = 0; r > e; e++) (i[0][e] = 909522486 ^ t[e]), (i[1][e] = 1549556828 ^ t[e])
        e._baseHash[0].update(i[0]), e._baseHash[1].update(i[1]), (e._resultHash = new n(e._baseHash[0]))
      }
      reset() {
        const t = this
        ;(t._resultHash = new t._hash(t._baseHash[0])), (t._updated = !1)
      }
      update(t) {
        ;(this._updated = !0), this._resultHash.update(t)
      }
      digest() {
        const t = this,
          e = t._resultHash.finalize(),
          n = new t._hash(t._baseHash[1]).update(e).finalize()
        return t.reset(), n
      }
    }
  class g {
    constructor(t, e, n) {
      Object.assign(this, { password: t, signed: e, strength: n - 1, pendingInput: new Uint8Array(0) })
    }
    async append(t) {
      const e = this
      if (e.password) {
        const n = A(t, 0, c[e.strength] + 2)
        await (async (t, e, n) => {
          await k(t, n, A(e, 0, c[t.strength]))
          const i = A(e, c[t.strength]),
            a = t.keys.passwordVerification
          if (a[0] != i[0] || a[1] != i[1]) throw Error(r)
        })(e, n, e.password),
          (e.password = null),
          (e.aesCtrGladman = new w(new p(e.keys.key), Array.from(h))),
          (e.hmac = new x(e.keys.authentication)),
          (t = A(t, c[e.strength] + 2))
      }
      return m(e, t, new Uint8Array(t.length - u - ((t.length - u) % s)), 0, u, !0)
    }
    flush() {
      const t = this,
        e = t.pendingInput,
        n = A(e, 0, e.length - u),
        i = A(e, e.length - u)
      let a = new Uint8Array(0)
      if (n.length) {
        const e = b.toBits(n)
        t.hmac.update(e)
        const i = t.aesCtrGladman.update(e)
        a = b.fromBits(i)
      }
      let r = !0
      if (t.signed) {
        const e = A(b.fromBits(t.hmac.digest()), 0, u)
        for (let t = 0; u > t; t++) e[t] != i[t] && (r = !1)
      }
      return { valid: r, data: a }
    }
  }
  class y {
    constructor(t, e) {
      Object.assign(this, { password: t, strength: e - 1, pendingInput: new Uint8Array(0) })
    }
    async append(t) {
      const e = this
      let n = new Uint8Array(0)
      e.password &&
        ((n = await (async (t, e) => {
          const n = crypto.getRandomValues(new Uint8Array(c[t.strength]))
          return await k(t, e, n), v(n, t.keys.passwordVerification)
        })(e, e.password)),
        (e.password = null),
        (e.aesCtrGladman = new w(new p(e.keys.key), Array.from(h))),
        (e.hmac = new x(e.keys.authentication)))
      const i = new Uint8Array(n.length + t.length - (t.length % s))
      return i.set(n, 0), m(e, t, i, n.length, 0)
    }
    flush() {
      const t = this
      let e = new Uint8Array(0)
      if (t.pendingInput.length) {
        const n = t.aesCtrGladman.update(b.toBits(t.pendingInput))
        t.hmac.update(n), (e = b.fromBits(n))
      }
      const n = A(b.fromBits(t.hmac.digest()), 0, u)
      return { data: v(e, n), signature: n }
    }
  }
  function m(t, e, n, i, a, r) {
    const l = e.length - a
    let o
    for (
      t.pendingInput.length &&
        ((e = v(t.pendingInput, e)),
        (n = ((t, e) => {
          if (e && e > t.length) {
            const n = t
            ;(t = new Uint8Array(e)).set(n, 0)
          }
          return t
        })(n, l - (l % s)))),
        o = 0;
      l - s >= o;
      o += s
    ) {
      const a = b.toBits(A(e, o, o + s))
      r && t.hmac.update(a)
      const l = t.aesCtrGladman.update(a)
      r || t.hmac.update(l), n.set(b.fromBits(l), o + i)
    }
    return (t.pendingInput = A(e, o)), n
  }
  async function k(t, e, n) {
    const i = ((t) => {
        if ("undefined" == typeof TextEncoder) {
          t = unescape(encodeURIComponent(t))
          const e = new Uint8Array(t.length)
          for (let n = 0; n < e.length; n++) e[n] = t.charCodeAt(n)
          return e
        }
        return new TextEncoder().encode(t)
      })(e),
      a = await crypto.subtle.importKey("raw", i, o, !1, d),
      r = await crypto.subtle.deriveBits(Object.assign({ salt: n }, _), a, 8 * (2 * f[t.strength] + 2)),
      s = new Uint8Array(r)
    t.keys = {
      key: b.toBits(A(s, 0, f[t.strength])),
      authentication: b.toBits(A(s, f[t.strength], 2 * f[t.strength])),
      passwordVerification: A(s, 2 * f[t.strength]),
    }
  }
  function v(t, e) {
    let n = t
    return t.length + e.length && ((n = new Uint8Array(t.length + e.length)), n.set(t, 0), n.set(e, t.length)), n
  }
  function A(t, e, n) {
    return t.subarray(e, n)
  }
  class U {
    constructor(t, e) {
      Object.assign(this, { password: t, passwordVerification: e }), I(this, t)
    }
    append(t) {
      const e = this
      if (e.password) {
        const n = z(e, t.subarray(0, 12))
        if (((e.password = null), n[11] != e.passwordVerification)) throw Error(r)
        t = t.subarray(12)
      }
      return z(e, t)
    }
    flush() {
      return { valid: !0, data: new Uint8Array(0) }
    }
  }
  class S {
    constructor(t, e) {
      Object.assign(this, { password: t, passwordVerification: e }), I(this, t)
    }
    append(t) {
      const e = this
      let n, i
      if (e.password) {
        e.password = null
        const a = crypto.getRandomValues(new Uint8Array(12))
        ;(a[11] = e.passwordVerification), (n = new Uint8Array(t.length + a.length)), n.set(E(e, a), 0), (i = 12)
      } else (n = new Uint8Array(t.length)), (i = 0)
      return n.set(E(e, t), i), n
    }
    flush() {
      return { data: new Uint8Array(0) }
    }
  }
  function z(t, e) {
    const n = new Uint8Array(e.length)
    for (let i = 0; i < e.length; i++) (n[i] = M(t) ^ e[i]), C(t, n[i])
    return n
  }
  function E(t, e) {
    const n = new Uint8Array(e.length)
    for (let i = 0; i < e.length; i++) (n[i] = M(t) ^ e[i]), C(t, e[i])
    return n
  }
  function I(t, n) {
    ;(t.keys = [305419896, 591751049, 878082192]), (t.crcKey0 = new e(t.keys[0])), (t.crcKey2 = new e(t.keys[2]))
    for (let e = 0; e < n.length; e++) C(t, n.charCodeAt(e))
  }
  function C(t, e) {
    t.crcKey0.append([e]),
      (t.keys[0] = ~t.crcKey0.get()),
      (t.keys[1] = H(t.keys[1] + B(t.keys[0]))),
      (t.keys[1] = H(Math.imul(t.keys[1], 134775813) + 1)),
      t.crcKey2.append([t.keys[1] >>> 24]),
      (t.keys[2] = ~t.crcKey2.get())
  }
  function M(t) {
    const e = 2 | t.keys[2]
    return B(Math.imul(e, 1 ^ e) >>> 8)
  }
  function B(t) {
    return 255 & t
  }
  function H(t) {
    return 4294967295 & t
  }
  const V = "deflate",
    D = "inflate",
    j = "Invalid signature"
  class O {
    constructor(
      t,
      {
        signature: n,
        password: i,
        signed: a,
        compressed: r,
        zipCrypto: s,
        passwordVerification: l,
        encryptionStrength: o,
      },
      { chunkSize: _ }
    ) {
      const d = !!i
      Object.assign(this, {
        signature: n,
        encrypted: d,
        signed: a,
        compressed: r,
        inflate: r && new t({ chunkSize: _ }),
        crc32: a && new e(),
        zipCrypto: s,
        decrypt: d && s ? new U(i, l) : new g(i, a, o),
      })
    }
    async append(t) {
      const e = this
      return (
        e.encrypted && t.length && (t = await e.decrypt.append(t)),
        e.compressed && t.length && (t = await e.inflate.append(t)),
        (!e.encrypted || e.zipCrypto) && e.signed && t.length && e.crc32.append(t),
        t
      )
    }
    async flush() {
      const t = this
      let e,
        n = new Uint8Array(0)
      if (t.encrypted) {
        const e = t.decrypt.flush()
        if (!e.valid) throw Error(j)
        n = e.data
      }
      if ((!t.encrypted || t.zipCrypto) && t.signed) {
        const n = new DataView(new Uint8Array(4).buffer)
        if (((e = t.crc32.get()), n.setUint32(0, e), t.signature != n.getUint32(0, !1))) throw Error(j)
      }
      return (
        t.compressed && ((n = (await t.inflate.append(n)) || new Uint8Array(0)), await t.inflate.flush()),
        { data: n, signature: e }
      )
    }
  }
  class P {
    constructor(
      t,
      {
        encrypted: n,
        signed: i,
        compressed: a,
        level: r,
        zipCrypto: s,
        password: l,
        passwordVerification: o,
        encryptionStrength: _,
      },
      { chunkSize: d }
    ) {
      Object.assign(this, {
        encrypted: n,
        signed: i,
        compressed: a,
        deflate: a && new t({ level: r || 5, chunkSize: d }),
        crc32: i && new e(),
        zipCrypto: s,
        encrypt: n && s ? new S(l, o) : new y(l, _),
      })
    }
    async append(t) {
      const e = this
      let n = t
      return (
        e.compressed && t.length && (n = await e.deflate.append(t)),
        e.encrypted && n.length && (n = await e.encrypt.append(n)),
        (!e.encrypted || e.zipCrypto) && e.signed && t.length && e.crc32.append(t),
        n
      )
    }
    async flush() {
      const t = this
      let e,
        n = new Uint8Array(0)
      if ((t.compressed && (n = (await t.deflate.flush()) || new Uint8Array(0)), t.encrypted)) {
        n = await t.encrypt.append(n)
        const i = t.encrypt.flush()
        e = i.signature
        const a = new Uint8Array(n.length + i.data.length)
        a.set(n, 0), a.set(i.data, n.length), (n = a)
      }
      return (t.encrypted && !t.zipCrypto) || !t.signed || (e = t.crc32.get()), { data: n, signature: e }
    }
  }
  const K = {
    init(t) {
      t.scripts && t.scripts.length && importScripts.apply(void 0, t.scripts)
      const e = t.options
      let n
      self.initCodec && self.initCodec(),
        e.codecType.startsWith(V) ? (n = self.Deflate) : e.codecType.startsWith(D) && (n = self.Inflate),
        (W = ((t, e, n) =>
          e.codecType.startsWith(V) ? new P(t, e, n) : e.codecType.startsWith(D) ? new O(t, e, n) : void 0)(
          n,
          e,
          t.config
        ))
    },
    append: async (t) => ({ data: await W.append(t.data) }),
    flush: () => W.flush(),
  }
  let W
  addEventListener("message", async (t) => {
    const e = t.data,
      n = e.type,
      i = K[n]
    if (i)
      try {
        e.data && (e.data = new Uint8Array(e.data))
        const t = (await i(e)) || {}
        if (((t.type = n), t.data))
          try {
            ;(t.data = t.data.buffer), postMessage(t, [t.data])
          } catch (e) {
            postMessage(t)
          }
        else postMessage(t)
      } catch (t) {
        postMessage({ type: n, error: { message: t.message, stack: t.stack } })
      }
  })
  const T = -2
  function G(t) {
    return L(t.map(([t, e]) => Array(t).fill(e, 0, t)))
  }
  function L(t) {
    return t.reduce((t, e) => t.concat(Array.isArray(e) ? L(e) : e), [])
  }
  const R = [0, 1, 2, 3].concat(
    ...G([
      [2, 4],
      [2, 5],
      [4, 6],
      [4, 7],
      [8, 8],
      [8, 9],
      [16, 10],
      [16, 11],
      [32, 12],
      [32, 13],
      [64, 14],
      [64, 15],
      [2, 0],
      [1, 16],
      [1, 17],
      [2, 18],
      [2, 19],
      [4, 20],
      [4, 21],
      [8, 22],
      [8, 23],
      [16, 24],
      [16, 25],
      [32, 26],
      [32, 27],
      [64, 28],
      [64, 29],
    ])
  )
  function q() {
    const t = this
    function e(t, e) {
      let n = 0
      do {
        ;(n |= 1 & t), (t >>>= 1), (n <<= 1)
      } while (--e > 0)
      return n >>> 1
    }
    t.build_tree = (n) => {
      const i = t.dyn_tree,
        a = t.stat_desc.static_tree,
        r = t.stat_desc.elems
      let s,
        l,
        o,
        _ = -1
      for (n.heap_len = 0, n.heap_max = 573, s = 0; r > s; s++)
        0 !== i[2 * s] ? ((n.heap[++n.heap_len] = _ = s), (n.depth[s] = 0)) : (i[2 * s + 1] = 0)
      for (; 2 > n.heap_len; )
        (o = n.heap[++n.heap_len] = 2 > _ ? ++_ : 0),
          (i[2 * o] = 1),
          (n.depth[o] = 0),
          n.opt_len--,
          a && (n.static_len -= a[2 * o + 1])
      for (t.max_code = _, s = Math.floor(n.heap_len / 2); s >= 1; s--) n.pqdownheap(i, s)
      o = r
      do {
        ;(s = n.heap[1]),
          (n.heap[1] = n.heap[n.heap_len--]),
          n.pqdownheap(i, 1),
          (l = n.heap[1]),
          (n.heap[--n.heap_max] = s),
          (n.heap[--n.heap_max] = l),
          (i[2 * o] = i[2 * s] + i[2 * l]),
          (n.depth[o] = Math.max(n.depth[s], n.depth[l]) + 1),
          (i[2 * s + 1] = i[2 * l + 1] = o),
          (n.heap[1] = o++),
          n.pqdownheap(i, 1)
      } while (n.heap_len >= 2)
      ;(n.heap[--n.heap_max] = n.heap[1]),
        ((e) => {
          const n = t.dyn_tree,
            i = t.stat_desc.static_tree,
            a = t.stat_desc.extra_bits,
            r = t.stat_desc.extra_base,
            s = t.stat_desc.max_length
          let l,
            o,
            _,
            d,
            c,
            f,
            u = 0
          for (d = 0; 15 >= d; d++) e.bl_count[d] = 0
          for (n[2 * e.heap[e.heap_max] + 1] = 0, l = e.heap_max + 1; 573 > l; l++)
            (o = e.heap[l]),
              (d = n[2 * n[2 * o + 1] + 1] + 1),
              d > s && ((d = s), u++),
              (n[2 * o + 1] = d),
              o > t.max_code ||
                (e.bl_count[d]++,
                (c = 0),
                r > o || (c = a[o - r]),
                (f = n[2 * o]),
                (e.opt_len += f * (d + c)),
                i && (e.static_len += f * (i[2 * o + 1] + c)))
          if (0 !== u) {
            do {
              for (d = s - 1; 0 === e.bl_count[d]; ) d--
              e.bl_count[d]--, (e.bl_count[d + 1] += 2), e.bl_count[s]--, (u -= 2)
            } while (u > 0)
            for (d = s; 0 !== d; d--)
              for (o = e.bl_count[d]; 0 !== o; )
                (_ = e.heap[--l]),
                  _ > t.max_code ||
                    (n[2 * _ + 1] != d && ((e.opt_len += (d - n[2 * _ + 1]) * n[2 * _]), (n[2 * _ + 1] = d)), o--)
          }
        })(n),
        ((t, n, i) => {
          const a = []
          let r,
            s,
            l,
            o = 0
          for (r = 1; 15 >= r; r++) a[r] = o = (o + i[r - 1]) << 1
          for (s = 0; n >= s; s++) (l = t[2 * s + 1]), 0 !== l && (t[2 * s] = e(a[l]++, l))
        })(i, t.max_code, n.bl_count)
    }
  }
  function F(t, e, n, i, a) {
    const r = this
    ;(r.static_tree = t), (r.extra_bits = e), (r.extra_base = n), (r.elems = i), (r.max_length = a)
  }
  function J(t, e, n, i, a) {
    const r = this
    ;(r.good_length = t), (r.max_lazy = e), (r.nice_length = n), (r.max_chain = i), (r.func = a)
  }
  ;(q._length_code = [0, 1, 2, 3, 4, 5, 6, 7].concat(
    ...G([
      [2, 8],
      [2, 9],
      [2, 10],
      [2, 11],
      [4, 12],
      [4, 13],
      [4, 14],
      [4, 15],
      [8, 16],
      [8, 17],
      [8, 18],
      [8, 19],
      [16, 20],
      [16, 21],
      [16, 22],
      [16, 23],
      [32, 24],
      [32, 25],
      [32, 26],
      [31, 27],
      [1, 28],
    ])
  )),
    (q.base_length = [
      0, 1, 2, 3, 4, 5, 6, 7, 8, 10, 12, 14, 16, 20, 24, 28, 32, 40, 48, 56, 64, 80, 96, 112, 128, 160, 192, 224, 0,
    ]),
    (q.base_dist = [
      0, 1, 2, 3, 4, 6, 8, 12, 16, 24, 32, 48, 64, 96, 128, 192, 256, 384, 512, 768, 1024, 1536, 2048, 3072, 4096, 6144,
      8192, 12288, 16384, 24576,
    ]),
    (q.d_code = (t) => (256 > t ? R[t] : R[256 + (t >>> 7)])),
    (q.extra_lbits = [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0]),
    (q.extra_dbits = [
      0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13,
    ]),
    (q.extra_blbits = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 3, 7]),
    (q.bl_order = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15]),
    (F.static_ltree = [
      12, 8, 140, 8, 76, 8, 204, 8, 44, 8, 172, 8, 108, 8, 236, 8, 28, 8, 156, 8, 92, 8, 220, 8, 60, 8, 188, 8, 124, 8,
      252, 8, 2, 8, 130, 8, 66, 8, 194, 8, 34, 8, 162, 8, 98, 8, 226, 8, 18, 8, 146, 8, 82, 8, 210, 8, 50, 8, 178, 8,
      114, 8, 242, 8, 10, 8, 138, 8, 74, 8, 202, 8, 42, 8, 170, 8, 106, 8, 234, 8, 26, 8, 154, 8, 90, 8, 218, 8, 58, 8,
      186, 8, 122, 8, 250, 8, 6, 8, 134, 8, 70, 8, 198, 8, 38, 8, 166, 8, 102, 8, 230, 8, 22, 8, 150, 8, 86, 8, 214, 8,
      54, 8, 182, 8, 118, 8, 246, 8, 14, 8, 142, 8, 78, 8, 206, 8, 46, 8, 174, 8, 110, 8, 238, 8, 30, 8, 158, 8, 94, 8,
      222, 8, 62, 8, 190, 8, 126, 8, 254, 8, 1, 8, 129, 8, 65, 8, 193, 8, 33, 8, 161, 8, 97, 8, 225, 8, 17, 8, 145, 8,
      81, 8, 209, 8, 49, 8, 177, 8, 113, 8, 241, 8, 9, 8, 137, 8, 73, 8, 201, 8, 41, 8, 169, 8, 105, 8, 233, 8, 25, 8,
      153, 8, 89, 8, 217, 8, 57, 8, 185, 8, 121, 8, 249, 8, 5, 8, 133, 8, 69, 8, 197, 8, 37, 8, 165, 8, 101, 8, 229, 8,
      21, 8, 149, 8, 85, 8, 213, 8, 53, 8, 181, 8, 117, 8, 245, 8, 13, 8, 141, 8, 77, 8, 205, 8, 45, 8, 173, 8, 109, 8,
      237, 8, 29, 8, 157, 8, 93, 8, 221, 8, 61, 8, 189, 8, 125, 8, 253, 8, 19, 9, 275, 9, 147, 9, 403, 9, 83, 9, 339, 9,
      211, 9, 467, 9, 51, 9, 307, 9, 179, 9, 435, 9, 115, 9, 371, 9, 243, 9, 499, 9, 11, 9, 267, 9, 139, 9, 395, 9, 75,
      9, 331, 9, 203, 9, 459, 9, 43, 9, 299, 9, 171, 9, 427, 9, 107, 9, 363, 9, 235, 9, 491, 9, 27, 9, 283, 9, 155, 9,
      411, 9, 91, 9, 347, 9, 219, 9, 475, 9, 59, 9, 315, 9, 187, 9, 443, 9, 123, 9, 379, 9, 251, 9, 507, 9, 7, 9, 263,
      9, 135, 9, 391, 9, 71, 9, 327, 9, 199, 9, 455, 9, 39, 9, 295, 9, 167, 9, 423, 9, 103, 9, 359, 9, 231, 9, 487, 9,
      23, 9, 279, 9, 151, 9, 407, 9, 87, 9, 343, 9, 215, 9, 471, 9, 55, 9, 311, 9, 183, 9, 439, 9, 119, 9, 375, 9, 247,
      9, 503, 9, 15, 9, 271, 9, 143, 9, 399, 9, 79, 9, 335, 9, 207, 9, 463, 9, 47, 9, 303, 9, 175, 9, 431, 9, 111, 9,
      367, 9, 239, 9, 495, 9, 31, 9, 287, 9, 159, 9, 415, 9, 95, 9, 351, 9, 223, 9, 479, 9, 63, 9, 319, 9, 191, 9, 447,
      9, 127, 9, 383, 9, 255, 9, 511, 9, 0, 7, 64, 7, 32, 7, 96, 7, 16, 7, 80, 7, 48, 7, 112, 7, 8, 7, 72, 7, 40, 7,
      104, 7, 24, 7, 88, 7, 56, 7, 120, 7, 4, 7, 68, 7, 36, 7, 100, 7, 20, 7, 84, 7, 52, 7, 116, 7, 3, 8, 131, 8, 67, 8,
      195, 8, 35, 8, 163, 8, 99, 8, 227, 8,
    ]),
    (F.static_dtree = [
      0, 5, 16, 5, 8, 5, 24, 5, 4, 5, 20, 5, 12, 5, 28, 5, 2, 5, 18, 5, 10, 5, 26, 5, 6, 5, 22, 5, 14, 5, 30, 5, 1, 5,
      17, 5, 9, 5, 25, 5, 5, 5, 21, 5, 13, 5, 29, 5, 3, 5, 19, 5, 11, 5, 27, 5, 7, 5, 23, 5,
    ]),
    (F.static_l_desc = new F(F.static_ltree, q.extra_lbits, 257, 286, 15)),
    (F.static_d_desc = new F(F.static_dtree, q.extra_dbits, 0, 30, 15)),
    (F.static_bl_desc = new F(null, q.extra_blbits, 0, 19, 7))
  const N = [
      new J(0, 0, 0, 0, 0),
      new J(4, 4, 8, 4, 1),
      new J(4, 5, 16, 8, 1),
      new J(4, 6, 32, 32, 1),
      new J(4, 4, 16, 16, 2),
      new J(8, 16, 32, 32, 2),
      new J(8, 16, 128, 128, 2),
      new J(8, 32, 128, 256, 2),
      new J(32, 128, 258, 1024, 2),
      new J(32, 258, 258, 4096, 2),
    ],
    Q = ["need dictionary", "stream end", "", "", "stream error", "data error", "", "buffer error", "", ""],
    X = 113,
    Y = 666,
    Z = 262
  function $(t, e, n, i) {
    const a = t[2 * e],
      r = t[2 * n]
    return r > a || (a == r && i[e] <= i[n])
  }
  function tt() {
    const t = this
    let e, n, i, a, r, s, l, o, _, d, c, f, u, h, b, p, w, x, g, y, m, k, v, A, U, S, z, E, I, C, M, B, H
    const V = new q(),
      D = new q(),
      j = new q()
    let O, P, K, W, G, L
    function R() {
      let e
      for (e = 0; 286 > e; e++) M[2 * e] = 0
      for (e = 0; 30 > e; e++) B[2 * e] = 0
      for (e = 0; 19 > e; e++) H[2 * e] = 0
      ;(M[512] = 1), (t.opt_len = t.static_len = 0), (P = K = 0)
    }
    function J(t, e) {
      let n,
        i = -1,
        a = t[1],
        r = 0,
        s = 7,
        l = 4
      0 === a && ((s = 138), (l = 3)), (t[2 * (e + 1) + 1] = 65535)
      for (let o = 0; e >= o; o++)
        (n = a),
          (a = t[2 * (o + 1) + 1]),
          (++r < s && n == a) ||
            (l > r ? (H[2 * n] += r) : 0 !== n ? (n != i && H[2 * n]++, H[32]++) : r > 10 ? H[36]++ : H[34]++,
            (r = 0),
            (i = n),
            0 === a ? ((s = 138), (l = 3)) : n == a ? ((s = 6), (l = 3)) : ((s = 7), (l = 4)))
    }
    function tt(e) {
      t.pending_buf[t.pending++] = e
    }
    function et(t) {
      tt(255 & t), tt((t >>> 8) & 255)
    }
    function nt(t, e) {
      let n
      const i = e
      L > 16 - i
        ? ((n = t), (G |= (n << L) & 65535), et(G), (G = n >>> (16 - L)), (L += i - 16))
        : ((G |= (t << L) & 65535), (L += i))
    }
    function it(t, e) {
      const n = 2 * t
      nt(65535 & e[n], 65535 & e[n + 1])
    }
    function at(t, e) {
      let n,
        i,
        a = -1,
        r = t[1],
        s = 0,
        l = 7,
        o = 4
      for (0 === r && ((l = 138), (o = 3)), n = 0; e >= n; n++)
        if (((i = r), (r = t[2 * (n + 1) + 1]), ++s >= l || i != r)) {
          if (o > s)
            do {
              it(i, H)
            } while (0 != --s)
          else
            0 !== i
              ? (i != a && (it(i, H), s--), it(16, H), nt(s - 3, 2))
              : s > 10
                ? (it(18, H), nt(s - 11, 7))
                : (it(17, H), nt(s - 3, 3))
          ;(s = 0), (a = i), 0 === r ? ((l = 138), (o = 3)) : i == r ? ((l = 6), (o = 3)) : ((l = 7), (o = 4))
        }
    }
    function rt() {
      16 == L ? (et(G), (G = 0), (L = 0)) : 8 > L || (tt(255 & G), (G >>>= 8), (L -= 8))
    }
    function st(e, n) {
      let i, a, r
      if (
        ((t.dist_buf[P] = e),
        (t.lc_buf[P] = 255 & n),
        P++,
        0 === e ? M[2 * n]++ : (K++, e--, M[2 * (q._length_code[n] + 256 + 1)]++, B[2 * q.d_code(e)]++),
        0 == (8191 & P) && z > 2)
      ) {
        for (i = 8 * P, a = m - w, r = 0; 30 > r; r++) i += B[2 * r] * (5 + q.extra_dbits[r])
        if (((i >>>= 3), Math.floor(P / 2) > K && Math.floor(a / 2) > i)) return !0
      }
      return P == O - 1
    }
    function lt(e, n) {
      let i,
        a,
        r,
        s,
        l = 0
      if (0 !== P)
        do {
          ;(i = t.dist_buf[l]),
            (a = t.lc_buf[l]),
            l++,
            0 === i
              ? it(a, e)
              : ((r = q._length_code[a]),
                it(r + 256 + 1, e),
                (s = q.extra_lbits[r]),
                0 !== s && ((a -= q.base_length[r]), nt(a, s)),
                i--,
                (r = q.d_code(i)),
                it(r, n),
                (s = q.extra_dbits[r]),
                0 !== s && ((i -= q.base_dist[r]), nt(i, s)))
        } while (P > l)
      it(256, e), (W = e[513])
    }
    function ot() {
      L > 8 ? et(G) : L > 0 && tt(255 & G), (G = 0), (L = 0)
    }
    function _t(e, n, i) {
      nt(0 + (i ? 1 : 0), 3),
        ((e, n) => {
          ot(), (W = 8), et(n), et(~n), t.pending_buf.set(o.subarray(e, e + n), t.pending), (t.pending += n)
        })(e, n)
    }
    function dt(n) {
      ;((e, n, i) => {
        let a,
          r,
          s = 0
        z > 0
          ? (V.build_tree(t),
            D.build_tree(t),
            (s = (() => {
              let e
              for (
                J(M, V.max_code), J(B, D.max_code), j.build_tree(t), e = 18;
                e >= 3 && 0 === H[2 * q.bl_order[e] + 1];
                e--
              );
              return (t.opt_len += 14 + 3 * (e + 1)), e
            })()),
            (a = (t.opt_len + 3 + 7) >>> 3),
            (r = (t.static_len + 3 + 7) >>> 3),
            r > a || (a = r))
          : (a = r = n + 5),
          n + 4 > a || -1 == e
            ? r == a
              ? (nt(2 + (i ? 1 : 0), 3), lt(F.static_ltree, F.static_dtree))
              : (nt(4 + (i ? 1 : 0), 3),
                ((t, e, n) => {
                  let i
                  for (nt(t - 257, 5), nt(e - 1, 5), nt(n - 4, 4), i = 0; n > i; i++) nt(H[2 * q.bl_order[i] + 1], 3)
                  at(M, t - 1), at(B, e - 1)
                })(V.max_code + 1, D.max_code + 1, s + 1),
                lt(M, B))
            : _t(e, n, i),
          R(),
          i && ot()
      })(0 > w ? -1 : w, m - w, n),
        (w = m),
        e.flush_pending()
    }
    function ct() {
      let t, n, i, a
      do {
        if (((a = _ - v - m), 0 === a && 0 === m && 0 === v)) a = r
        else if (-1 == a) a--
        else if (m >= r + r - Z) {
          o.set(o.subarray(r, r + r), 0), (k -= r), (m -= r), (w -= r), (t = u), (i = t)
          do {
            ;(n = 65535 & c[--i]), (c[i] = r > n ? 0 : n - r)
          } while (0 != --t)
          ;(t = r), (i = t)
          do {
            ;(n = 65535 & d[--i]), (d[i] = r > n ? 0 : n - r)
          } while (0 != --t)
          a += r
        }
        if (0 === e.avail_in) return
        ;(t = e.read_buf(o, m + v, a)), (v += t), 3 > v || ((f = 255 & o[m]), (f = ((f << p) ^ (255 & o[m + 1])) & b))
      } while (Z > v && 0 !== e.avail_in)
    }
    function ft(t) {
      let e,
        n,
        i = U,
        a = m,
        s = A
      const _ = m > r - Z ? m - (r - Z) : 0
      let c = C
      const f = l,
        u = m + 258
      let h = o[a + s - 1],
        b = o[a + s]
      I > A || (i >>= 2), c > v && (c = v)
      do {
        if (((e = t), o[e + s] == b && o[e + s - 1] == h && o[e] == o[a] && o[++e] == o[a + 1])) {
          ;(a += 2), e++
          do {} while (
            o[++a] == o[++e] &&
            o[++a] == o[++e] &&
            o[++a] == o[++e] &&
            o[++a] == o[++e] &&
            o[++a] == o[++e] &&
            o[++a] == o[++e] &&
            o[++a] == o[++e] &&
            o[++a] == o[++e] &&
            u > a
          )
          if (((n = 258 - (u - a)), (a = u - 258), n > s)) {
            if (((k = t), (s = n), n >= c)) break
            ;(h = o[a + s - 1]), (b = o[a + s])
          }
        }
      } while ((t = 65535 & d[t & f]) > _ && 0 != --i)
      return s > v ? v : s
    }
    ;(t.depth = []),
      (t.bl_count = []),
      (t.heap = []),
      (M = []),
      (B = []),
      (H = []),
      (t.pqdownheap = (e, n) => {
        const i = t.heap,
          a = i[n]
        let r = n << 1
        for (; r <= t.heap_len && (r < t.heap_len && $(e, i[r + 1], i[r], t.depth) && r++, !$(e, a, i[r], t.depth)); )
          (i[n] = i[r]), (n = r), (r <<= 1)
        i[n] = a
      }),
      (t.deflateInit = (e, g, k, P, K, q) => (
        P || (P = 8),
        K || (K = 8),
        q || (q = 0),
        (e.msg = null),
        -1 == g && (g = 6),
        1 > K || K > 9 || 8 != P || 9 > k || k > 15 || 0 > g || g > 9 || 0 > q || q > 2
          ? T
          : ((e.dstate = t),
            (s = k),
            (r = 1 << s),
            (l = r - 1),
            (h = K + 7),
            (u = 1 << h),
            (b = u - 1),
            (p = Math.floor((h + 3 - 1) / 3)),
            (o = new Uint8Array(2 * r)),
            (d = []),
            (c = []),
            (O = 1 << (K + 6)),
            (t.pending_buf = new Uint8Array(4 * O)),
            (i = 4 * O),
            (t.dist_buf = new Uint16Array(O)),
            (t.lc_buf = new Uint8Array(O)),
            (z = g),
            (E = q),
            ((e) => (
              (e.total_in = e.total_out = 0),
              (e.msg = null),
              (t.pending = 0),
              (t.pending_out = 0),
              (n = X),
              (a = 0),
              (V.dyn_tree = M),
              (V.stat_desc = F.static_l_desc),
              (D.dyn_tree = B),
              (D.stat_desc = F.static_d_desc),
              (j.dyn_tree = H),
              (j.stat_desc = F.static_bl_desc),
              (G = 0),
              (L = 0),
              (W = 8),
              R(),
              (() => {
                ;(_ = 2 * r), (c[u - 1] = 0)
                for (let t = 0; u - 1 > t; t++) c[t] = 0
                ;(S = N[z].max_lazy),
                  (I = N[z].good_length),
                  (C = N[z].nice_length),
                  (U = N[z].max_chain),
                  (m = 0),
                  (w = 0),
                  (v = 0),
                  (x = A = 2),
                  (y = 0),
                  (f = 0)
              })(),
              0
            ))(e))
      )),
      (t.deflateEnd = () =>
        42 != n && n != X && n != Y
          ? T
          : ((t.lc_buf = null),
            (t.dist_buf = null),
            (t.pending_buf = null),
            (c = null),
            (d = null),
            (o = null),
            (t.dstate = null),
            n == X ? -3 : 0)),
      (t.deflateParams = (t, e, n) => {
        let i = 0
        return (
          -1 == e && (e = 6),
          0 > e || e > 9 || 0 > n || n > 2
            ? T
            : (N[z].func != N[e].func && 0 !== t.total_in && (i = t.deflate(1)),
              z != e &&
                ((z = e), (S = N[z].max_lazy), (I = N[z].good_length), (C = N[z].nice_length), (U = N[z].max_chain)),
              (E = n),
              i)
        )
      }),
      (t.deflateSetDictionary = (t, e, i) => {
        let a,
          s = i,
          _ = 0
        if (!e || 42 != n) return T
        if (3 > s) return 0
        for (
          s > r - Z && ((s = r - Z), (_ = i - s)),
            o.set(e.subarray(_, _ + s), 0),
            m = s,
            w = s,
            f = 255 & o[0],
            f = ((f << p) ^ (255 & o[1])) & b,
            a = 0;
          s - 3 >= a;
          a++
        )
          (f = ((f << p) ^ (255 & o[a + 2])) & b), (d[a & l] = c[f]), (c[f] = a)
        return 0
      }),
      (t.deflate = (_, h) => {
        let U, I, C, M, B
        if (h > 4 || 0 > h) return T
        if (!_.next_out || (!_.next_in && 0 !== _.avail_in) || (n == Y && 4 != h)) return (_.msg = Q[4]), T
        if (0 === _.avail_out) return (_.msg = Q[7]), -5
        var H
        if (
          ((e = _),
          (M = a),
          (a = h),
          42 == n &&
            ((I = (8 + ((s - 8) << 4)) << 8),
            (C = ((z - 1) & 255) >> 1),
            C > 3 && (C = 3),
            (I |= C << 6),
            0 !== m && (I |= 32),
            (I += 31 - (I % 31)),
            (n = X),
            tt(((H = I) >> 8) & 255),
            tt(255 & H)),
          0 !== t.pending)
        ) {
          if ((e.flush_pending(), 0 === e.avail_out)) return (a = -1), 0
        } else if (0 === e.avail_in && M >= h && 4 != h) return (e.msg = Q[7]), -5
        if (n == Y && 0 !== e.avail_in) return (_.msg = Q[7]), -5
        if (0 !== e.avail_in || 0 !== v || (0 != h && n != Y)) {
          switch (((B = -1), N[z].func)) {
            case 0:
              B = ((t) => {
                let n,
                  a = 65535
                for (a > i - 5 && (a = i - 5); ; ) {
                  if (1 >= v) {
                    if ((ct(), 0 === v && 0 == t)) return 0
                    if (0 === v) break
                  }
                  if (
                    ((m += v),
                    (v = 0),
                    (n = w + a),
                    (0 === m || m >= n) && ((v = m - n), (m = n), dt(!1), 0 === e.avail_out))
                  )
                    return 0
                  if (m - w >= r - Z && (dt(!1), 0 === e.avail_out)) return 0
                }
                return dt(4 == t), 0 === e.avail_out ? (4 == t ? 2 : 0) : 4 == t ? 3 : 1
              })(h)
              break
            case 1:
              B = ((t) => {
                let n,
                  i = 0
                for (;;) {
                  if (Z > v) {
                    if ((ct(), Z > v && 0 == t)) return 0
                    if (0 === v) break
                  }
                  if (
                    (3 > v ||
                      ((f = ((f << p) ^ (255 & o[m + 2])) & b), (i = 65535 & c[f]), (d[m & l] = c[f]), (c[f] = m)),
                    0 === i || ((m - i) & 65535) > r - Z || (2 != E && (x = ft(i))),
                    3 > x)
                  )
                    (n = st(0, 255 & o[m])), v--, m++
                  else if (((n = st(m - k, x - 3)), (v -= x), x > S || 3 > v))
                    (m += x), (x = 0), (f = 255 & o[m]), (f = ((f << p) ^ (255 & o[m + 1])) & b)
                  else {
                    x--
                    do {
                      m++, (f = ((f << p) ^ (255 & o[m + 2])) & b), (i = 65535 & c[f]), (d[m & l] = c[f]), (c[f] = m)
                    } while (0 != --x)
                    m++
                  }
                  if (n && (dt(!1), 0 === e.avail_out)) return 0
                }
                return dt(4 == t), 0 === e.avail_out ? (4 == t ? 2 : 0) : 4 == t ? 3 : 1
              })(h)
              break
            case 2:
              B = ((t) => {
                let n,
                  i,
                  a = 0
                for (;;) {
                  if (Z > v) {
                    if ((ct(), Z > v && 0 == t)) return 0
                    if (0 === v) break
                  }
                  if (
                    (3 > v ||
                      ((f = ((f << p) ^ (255 & o[m + 2])) & b), (a = 65535 & c[f]), (d[m & l] = c[f]), (c[f] = m)),
                    (A = x),
                    (g = k),
                    (x = 2),
                    0 !== a &&
                      S > A &&
                      r - Z >= ((m - a) & 65535) &&
                      (2 != E && (x = ft(a)), 5 >= x && (1 == E || (3 == x && m - k > 4096)) && (x = 2)),
                    3 > A || x > A)
                  )
                    if (0 !== y) {
                      if (((n = st(0, 255 & o[m - 1])), n && dt(!1), m++, v--, 0 === e.avail_out)) return 0
                    } else (y = 1), m++, v--
                  else {
                    ;(i = m + v - 3), (n = st(m - 1 - g, A - 3)), (v -= A - 1), (A -= 2)
                    do {
                      ++m > i ||
                        ((f = ((f << p) ^ (255 & o[m + 2])) & b), (a = 65535 & c[f]), (d[m & l] = c[f]), (c[f] = m))
                    } while (0 != --A)
                    if (((y = 0), (x = 2), m++, n && (dt(!1), 0 === e.avail_out))) return 0
                  }
                }
                return (
                  0 !== y && ((n = st(0, 255 & o[m - 1])), (y = 0)),
                  dt(4 == t),
                  0 === e.avail_out ? (4 == t ? 2 : 0) : 4 == t ? 3 : 1
                )
              })(h)
          }
          if (((2 != B && 3 != B) || (n = Y), 0 == B || 2 == B)) return 0 === e.avail_out && (a = -1), 0
          if (1 == B) {
            if (1 == h)
              nt(2, 3),
                it(256, F.static_ltree),
                rt(),
                9 > 1 + W + 10 - L && (nt(2, 3), it(256, F.static_ltree), rt()),
                (W = 7)
            else if ((_t(0, 0, !1), 3 == h)) for (U = 0; u > U; U++) c[U] = 0
            if ((e.flush_pending(), 0 === e.avail_out)) return (a = -1), 0
          }
        }
        return 4 != h ? 0 : 1
      })
  }
  function et() {
    const t = this
    ;(t.next_in_index = 0),
      (t.next_out_index = 0),
      (t.avail_in = 0),
      (t.total_in = 0),
      (t.avail_out = 0),
      (t.total_out = 0)
  }
  function nt(t) {
    const e = new et(),
      n = (i = t && t.chunkSize ? t.chunkSize : 65536) + 5 * (Math.floor(i / 16383) + 1)
    var i
    const a = new Uint8Array(n)
    let r = t ? t.level : -1
    void 0 === r && (r = -1),
      e.deflateInit(r),
      (e.next_out = a),
      (this.append = (t, i) => {
        let r,
          s,
          l = 0,
          o = 0,
          _ = 0
        const d = []
        if (t.length) {
          ;(e.next_in_index = 0), (e.next_in = t), (e.avail_in = t.length)
          do {
            if (((e.next_out_index = 0), (e.avail_out = n), (r = e.deflate(0)), 0 != r))
              throw Error("deflating: " + e.msg)
            e.next_out_index &&
              (e.next_out_index == n ? d.push(new Uint8Array(a)) : d.push(a.slice(0, e.next_out_index))),
              (_ += e.next_out_index),
              i && e.next_in_index > 0 && e.next_in_index != l && (i(e.next_in_index), (l = e.next_in_index))
          } while (e.avail_in > 0 || 0 === e.avail_out)
          return (
            d.length > 1
              ? ((s = new Uint8Array(_)),
                d.forEach((t) => {
                  s.set(t, o), (o += t.length)
                }))
              : (s = d[0] || new Uint8Array(0)),
            s
          )
        }
      }),
      (this.flush = () => {
        let t,
          i,
          r = 0,
          s = 0
        const l = []
        do {
          if (((e.next_out_index = 0), (e.avail_out = n), (t = e.deflate(4)), 1 != t && 0 != t))
            throw Error("deflating: " + e.msg)
          n - e.avail_out > 0 && l.push(a.slice(0, e.next_out_index)), (s += e.next_out_index)
        } while (e.avail_in > 0 || 0 === e.avail_out)
        return (
          e.deflateEnd(),
          (i = new Uint8Array(s)),
          l.forEach((t) => {
            i.set(t, r), (r += t.length)
          }),
          i
        )
      })
  }
  et.prototype = {
    deflateInit: function (t, e) {
      const n = this
      return (n.dstate = new tt()), e || (e = 15), n.dstate.deflateInit(n, t, e)
    },
    deflate: function (t) {
      const e = this
      return e.dstate ? e.dstate.deflate(e, t) : T
    },
    deflateEnd: function () {
      const t = this
      if (!t.dstate) return T
      const e = t.dstate.deflateEnd()
      return (t.dstate = null), e
    },
    deflateParams: function (t, e) {
      const n = this
      return n.dstate ? n.dstate.deflateParams(n, t, e) : T
    },
    deflateSetDictionary: function (t, e) {
      const n = this
      return n.dstate ? n.dstate.deflateSetDictionary(n, t, e) : T
    },
    read_buf: function (t, e, n) {
      const i = this
      let a = i.avail_in
      return (
        a > n && (a = n),
        0 === a
          ? 0
          : ((i.avail_in -= a),
            t.set(i.next_in.subarray(i.next_in_index, i.next_in_index + a), e),
            (i.next_in_index += a),
            (i.total_in += a),
            a)
      )
    },
    flush_pending: function () {
      const t = this
      let e = t.dstate.pending
      e > t.avail_out && (e = t.avail_out),
        0 !== e &&
          (t.next_out.set(
            t.dstate.pending_buf.subarray(t.dstate.pending_out, t.dstate.pending_out + e),
            t.next_out_index
          ),
          (t.next_out_index += e),
          (t.dstate.pending_out += e),
          (t.total_out += e),
          (t.avail_out -= e),
          (t.dstate.pending -= e),
          0 === t.dstate.pending && (t.dstate.pending_out = 0))
    },
  }
  const it = -2,
    at = -3,
    rt = -5,
    st = [0, 1, 3, 7, 15, 31, 63, 127, 255, 511, 1023, 2047, 4095, 8191, 16383, 32767, 65535],
    lt = [
      96, 7, 256, 0, 8, 80, 0, 8, 16, 84, 8, 115, 82, 7, 31, 0, 8, 112, 0, 8, 48, 0, 9, 192, 80, 7, 10, 0, 8, 96, 0, 8,
      32, 0, 9, 160, 0, 8, 0, 0, 8, 128, 0, 8, 64, 0, 9, 224, 80, 7, 6, 0, 8, 88, 0, 8, 24, 0, 9, 144, 83, 7, 59, 0, 8,
      120, 0, 8, 56, 0, 9, 208, 81, 7, 17, 0, 8, 104, 0, 8, 40, 0, 9, 176, 0, 8, 8, 0, 8, 136, 0, 8, 72, 0, 9, 240, 80,
      7, 4, 0, 8, 84, 0, 8, 20, 85, 8, 227, 83, 7, 43, 0, 8, 116, 0, 8, 52, 0, 9, 200, 81, 7, 13, 0, 8, 100, 0, 8, 36,
      0, 9, 168, 0, 8, 4, 0, 8, 132, 0, 8, 68, 0, 9, 232, 80, 7, 8, 0, 8, 92, 0, 8, 28, 0, 9, 152, 84, 7, 83, 0, 8, 124,
      0, 8, 60, 0, 9, 216, 82, 7, 23, 0, 8, 108, 0, 8, 44, 0, 9, 184, 0, 8, 12, 0, 8, 140, 0, 8, 76, 0, 9, 248, 80, 7,
      3, 0, 8, 82, 0, 8, 18, 85, 8, 163, 83, 7, 35, 0, 8, 114, 0, 8, 50, 0, 9, 196, 81, 7, 11, 0, 8, 98, 0, 8, 34, 0, 9,
      164, 0, 8, 2, 0, 8, 130, 0, 8, 66, 0, 9, 228, 80, 7, 7, 0, 8, 90, 0, 8, 26, 0, 9, 148, 84, 7, 67, 0, 8, 122, 0, 8,
      58, 0, 9, 212, 82, 7, 19, 0, 8, 106, 0, 8, 42, 0, 9, 180, 0, 8, 10, 0, 8, 138, 0, 8, 74, 0, 9, 244, 80, 7, 5, 0,
      8, 86, 0, 8, 22, 192, 8, 0, 83, 7, 51, 0, 8, 118, 0, 8, 54, 0, 9, 204, 81, 7, 15, 0, 8, 102, 0, 8, 38, 0, 9, 172,
      0, 8, 6, 0, 8, 134, 0, 8, 70, 0, 9, 236, 80, 7, 9, 0, 8, 94, 0, 8, 30, 0, 9, 156, 84, 7, 99, 0, 8, 126, 0, 8, 62,
      0, 9, 220, 82, 7, 27, 0, 8, 110, 0, 8, 46, 0, 9, 188, 0, 8, 14, 0, 8, 142, 0, 8, 78, 0, 9, 252, 96, 7, 256, 0, 8,
      81, 0, 8, 17, 85, 8, 131, 82, 7, 31, 0, 8, 113, 0, 8, 49, 0, 9, 194, 80, 7, 10, 0, 8, 97, 0, 8, 33, 0, 9, 162, 0,
      8, 1, 0, 8, 129, 0, 8, 65, 0, 9, 226, 80, 7, 6, 0, 8, 89, 0, 8, 25, 0, 9, 146, 83, 7, 59, 0, 8, 121, 0, 8, 57, 0,
      9, 210, 81, 7, 17, 0, 8, 105, 0, 8, 41, 0, 9, 178, 0, 8, 9, 0, 8, 137, 0, 8, 73, 0, 9, 242, 80, 7, 4, 0, 8, 85, 0,
      8, 21, 80, 8, 258, 83, 7, 43, 0, 8, 117, 0, 8, 53, 0, 9, 202, 81, 7, 13, 0, 8, 101, 0, 8, 37, 0, 9, 170, 0, 8, 5,
      0, 8, 133, 0, 8, 69, 0, 9, 234, 80, 7, 8, 0, 8, 93, 0, 8, 29, 0, 9, 154, 84, 7, 83, 0, 8, 125, 0, 8, 61, 0, 9,
      218, 82, 7, 23, 0, 8, 109, 0, 8, 45, 0, 9, 186, 0, 8, 13, 0, 8, 141, 0, 8, 77, 0, 9, 250, 80, 7, 3, 0, 8, 83, 0,
      8, 19, 85, 8, 195, 83, 7, 35, 0, 8, 115, 0, 8, 51, 0, 9, 198, 81, 7, 11, 0, 8, 99, 0, 8, 35, 0, 9, 166, 0, 8, 3,
      0, 8, 131, 0, 8, 67, 0, 9, 230, 80, 7, 7, 0, 8, 91, 0, 8, 27, 0, 9, 150, 84, 7, 67, 0, 8, 123, 0, 8, 59, 0, 9,
      214, 82, 7, 19, 0, 8, 107, 0, 8, 43, 0, 9, 182, 0, 8, 11, 0, 8, 139, 0, 8, 75, 0, 9, 246, 80, 7, 5, 0, 8, 87, 0,
      8, 23, 192, 8, 0, 83, 7, 51, 0, 8, 119, 0, 8, 55, 0, 9, 206, 81, 7, 15, 0, 8, 103, 0, 8, 39, 0, 9, 174, 0, 8, 7,
      0, 8, 135, 0, 8, 71, 0, 9, 238, 80, 7, 9, 0, 8, 95, 0, 8, 31, 0, 9, 158, 84, 7, 99, 0, 8, 127, 0, 8, 63, 0, 9,
      222, 82, 7, 27, 0, 8, 111, 0, 8, 47, 0, 9, 190, 0, 8, 15, 0, 8, 143, 0, 8, 79, 0, 9, 254, 96, 7, 256, 0, 8, 80, 0,
      8, 16, 84, 8, 115, 82, 7, 31, 0, 8, 112, 0, 8, 48, 0, 9, 193, 80, 7, 10, 0, 8, 96, 0, 8, 32, 0, 9, 161, 0, 8, 0,
      0, 8, 128, 0, 8, 64, 0, 9, 225, 80, 7, 6, 0, 8, 88, 0, 8, 24, 0, 9, 145, 83, 7, 59, 0, 8, 120, 0, 8, 56, 0, 9,
      209, 81, 7, 17, 0, 8, 104, 0, 8, 40, 0, 9, 177, 0, 8, 8, 0, 8, 136, 0, 8, 72, 0, 9, 241, 80, 7, 4, 0, 8, 84, 0, 8,
      20, 85, 8, 227, 83, 7, 43, 0, 8, 116, 0, 8, 52, 0, 9, 201, 81, 7, 13, 0, 8, 100, 0, 8, 36, 0, 9, 169, 0, 8, 4, 0,
      8, 132, 0, 8, 68, 0, 9, 233, 80, 7, 8, 0, 8, 92, 0, 8, 28, 0, 9, 153, 84, 7, 83, 0, 8, 124, 0, 8, 60, 0, 9, 217,
      82, 7, 23, 0, 8, 108, 0, 8, 44, 0, 9, 185, 0, 8, 12, 0, 8, 140, 0, 8, 76, 0, 9, 249, 80, 7, 3, 0, 8, 82, 0, 8, 18,
      85, 8, 163, 83, 7, 35, 0, 8, 114, 0, 8, 50, 0, 9, 197, 81, 7, 11, 0, 8, 98, 0, 8, 34, 0, 9, 165, 0, 8, 2, 0, 8,
      130, 0, 8, 66, 0, 9, 229, 80, 7, 7, 0, 8, 90, 0, 8, 26, 0, 9, 149, 84, 7, 67, 0, 8, 122, 0, 8, 58, 0, 9, 213, 82,
      7, 19, 0, 8, 106, 0, 8, 42, 0, 9, 181, 0, 8, 10, 0, 8, 138, 0, 8, 74, 0, 9, 245, 80, 7, 5, 0, 8, 86, 0, 8, 22,
      192, 8, 0, 83, 7, 51, 0, 8, 118, 0, 8, 54, 0, 9, 205, 81, 7, 15, 0, 8, 102, 0, 8, 38, 0, 9, 173, 0, 8, 6, 0, 8,
      134, 0, 8, 70, 0, 9, 237, 80, 7, 9, 0, 8, 94, 0, 8, 30, 0, 9, 157, 84, 7, 99, 0, 8, 126, 0, 8, 62, 0, 9, 221, 82,
      7, 27, 0, 8, 110, 0, 8, 46, 0, 9, 189, 0, 8, 14, 0, 8, 142, 0, 8, 78, 0, 9, 253, 96, 7, 256, 0, 8, 81, 0, 8, 17,
      85, 8, 131, 82, 7, 31, 0, 8, 113, 0, 8, 49, 0, 9, 195, 80, 7, 10, 0, 8, 97, 0, 8, 33, 0, 9, 163, 0, 8, 1, 0, 8,
      129, 0, 8, 65, 0, 9, 227, 80, 7, 6, 0, 8, 89, 0, 8, 25, 0, 9, 147, 83, 7, 59, 0, 8, 121, 0, 8, 57, 0, 9, 211, 81,
      7, 17, 0, 8, 105, 0, 8, 41, 0, 9, 179, 0, 8, 9, 0, 8, 137, 0, 8, 73, 0, 9, 243, 80, 7, 4, 0, 8, 85, 0, 8, 21, 80,
      8, 258, 83, 7, 43, 0, 8, 117, 0, 8, 53, 0, 9, 203, 81, 7, 13, 0, 8, 101, 0, 8, 37, 0, 9, 171, 0, 8, 5, 0, 8, 133,
      0, 8, 69, 0, 9, 235, 80, 7, 8, 0, 8, 93, 0, 8, 29, 0, 9, 155, 84, 7, 83, 0, 8, 125, 0, 8, 61, 0, 9, 219, 82, 7,
      23, 0, 8, 109, 0, 8, 45, 0, 9, 187, 0, 8, 13, 0, 8, 141, 0, 8, 77, 0, 9, 251, 80, 7, 3, 0, 8, 83, 0, 8, 19, 85, 8,
      195, 83, 7, 35, 0, 8, 115, 0, 8, 51, 0, 9, 199, 81, 7, 11, 0, 8, 99, 0, 8, 35, 0, 9, 167, 0, 8, 3, 0, 8, 131, 0,
      8, 67, 0, 9, 231, 80, 7, 7, 0, 8, 91, 0, 8, 27, 0, 9, 151, 84, 7, 67, 0, 8, 123, 0, 8, 59, 0, 9, 215, 82, 7, 19,
      0, 8, 107, 0, 8, 43, 0, 9, 183, 0, 8, 11, 0, 8, 139, 0, 8, 75, 0, 9, 247, 80, 7, 5, 0, 8, 87, 0, 8, 23, 192, 8, 0,
      83, 7, 51, 0, 8, 119, 0, 8, 55, 0, 9, 207, 81, 7, 15, 0, 8, 103, 0, 8, 39, 0, 9, 175, 0, 8, 7, 0, 8, 135, 0, 8,
      71, 0, 9, 239, 80, 7, 9, 0, 8, 95, 0, 8, 31, 0, 9, 159, 84, 7, 99, 0, 8, 127, 0, 8, 63, 0, 9, 223, 82, 7, 27, 0,
      8, 111, 0, 8, 47, 0, 9, 191, 0, 8, 15, 0, 8, 143, 0, 8, 79, 0, 9, 255,
    ],
    ot = [
      80, 5, 1, 87, 5, 257, 83, 5, 17, 91, 5, 4097, 81, 5, 5, 89, 5, 1025, 85, 5, 65, 93, 5, 16385, 80, 5, 3, 88, 5,
      513, 84, 5, 33, 92, 5, 8193, 82, 5, 9, 90, 5, 2049, 86, 5, 129, 192, 5, 24577, 80, 5, 2, 87, 5, 385, 83, 5, 25,
      91, 5, 6145, 81, 5, 7, 89, 5, 1537, 85, 5, 97, 93, 5, 24577, 80, 5, 4, 88, 5, 769, 84, 5, 49, 92, 5, 12289, 82, 5,
      13, 90, 5, 3073, 86, 5, 193, 192, 5, 24577,
    ],
    _t = [
      3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 15, 17, 19, 23, 27, 31, 35, 43, 51, 59, 67, 83, 99, 115, 131, 163, 195, 227, 258,
      0, 0,
    ],
    dt = [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0, 112, 112],
    ct = [
      1, 2, 3, 4, 5, 7, 9, 13, 17, 25, 33, 49, 65, 97, 129, 193, 257, 385, 513, 769, 1025, 1537, 2049, 3073, 4097, 6145,
      8193, 12289, 16385, 24577,
    ],
    ft = [0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13]
  function ut() {
    let t, e, n, i, a, r
    function s(t, e, s, l, o, _, d, c, f, u, h) {
      let b, p, w, x, g, y, m, k, v, A, U, S, z, E, I
      ;(A = 0), (g = s)
      do {
        n[t[e + A]]++, A++, g--
      } while (0 !== g)
      if (n[0] == s) return (d[0] = -1), (c[0] = 0), 0
      for (k = c[0], y = 1; 15 >= y && 0 === n[y]; y++);
      for (m = y, y > k && (k = y), g = 15; 0 !== g && 0 === n[g]; g--);
      for (w = g, k > g && (k = g), c[0] = k, E = 1 << y; g > y; y++, E <<= 1) if (0 > (E -= n[y])) return at
      if (0 > (E -= n[g])) return at
      for (n[g] += E, r[1] = y = 0, A = 1, z = 2; 0 != --g; ) (r[z] = y += n[A]), z++, A++
      ;(g = 0), (A = 0)
      do {
        0 !== (y = t[e + A]) && (h[r[y]++] = g), A++
      } while (++g < s)
      for (s = r[w], r[0] = g = 0, A = 0, x = -1, S = -k, a[0] = 0, U = 0, I = 0; w >= m; m++)
        for (b = n[m]; 0 != b--; ) {
          for (; m > S + k; ) {
            if (
              (x++,
              (S += k),
              (I = w - S),
              (I = I > k ? k : I),
              (p = 1 << (y = m - S)) > b + 1 && ((p -= b + 1), (z = m), I > y))
            )
              for (; ++y < I && (p <<= 1) > n[++z]; ) p -= n[z]
            if (((I = 1 << y), u[0] + I > 1440)) return at
            ;(a[x] = U = u[0]),
              (u[0] += I),
              0 !== x
                ? ((r[x] = g),
                  (i[0] = y),
                  (i[1] = k),
                  (y = g >>> (S - k)),
                  (i[2] = U - a[x - 1] - y),
                  f.set(i, 3 * (a[x - 1] + y)))
                : (d[0] = U)
          }
          for (
            i[1] = m - S,
              s > A
                ? h[A] < l
                  ? ((i[0] = 256 > h[A] ? 0 : 96), (i[2] = h[A++]))
                  : ((i[0] = _[h[A] - l] + 16 + 64), (i[2] = o[h[A++] - l]))
                : (i[0] = 192),
              p = 1 << (m - S),
              y = g >>> S;
            I > y;
            y += p
          )
            f.set(i, 3 * (U + y))
          for (y = 1 << (m - 1); 0 != (g & y); y >>>= 1) g ^= y
          for (g ^= y, v = (1 << S) - 1; (g & v) != r[x]; ) x--, (S -= k), (v = (1 << S) - 1)
        }
      return 0 !== E && 1 != w ? rt : 0
    }
    function l(s) {
      let l
      for (
        t ||
          ((t = []), (e = []), (n = new Int32Array(16)), (i = []), (a = new Int32Array(15)), (r = new Int32Array(16))),
          e.length < s && (e = []),
          l = 0;
        s > l;
        l++
      )
        e[l] = 0
      for (l = 0; 16 > l; l++) n[l] = 0
      for (l = 0; 3 > l; l++) i[l] = 0
      a.set(n.subarray(0, 15), 0), r.set(n.subarray(0, 16), 0)
    }
    ;(this.inflate_trees_bits = (n, i, a, r, o) => {
      let _
      return (
        l(19),
        (t[0] = 0),
        (_ = s(n, 0, 19, 19, null, null, a, i, r, t, e)),
        _ == at
          ? (o.msg = "oversubscribed dynamic bit lengths tree")
          : (_ != rt && 0 !== i[0]) || ((o.msg = "incomplete dynamic bit lengths tree"), (_ = at)),
        _
      )
    }),
      (this.inflate_trees_dynamic = (n, i, a, r, o, _, d, c, f) => {
        let u
        return (
          l(288),
          (t[0] = 0),
          (u = s(a, 0, n, 257, _t, dt, _, r, c, t, e)),
          0 != u || 0 === r[0]
            ? (u == at
                ? (f.msg = "oversubscribed literal/length tree")
                : -4 != u && ((f.msg = "incomplete literal/length tree"), (u = at)),
              u)
            : (l(288),
              (u = s(a, n, i, 0, ct, ft, d, o, c, t, e)),
              0 != u || (0 === o[0] && n > 257)
                ? (u == at
                    ? (f.msg = "oversubscribed distance tree")
                    : u == rt
                      ? ((f.msg = "incomplete distance tree"), (u = at))
                      : -4 != u && ((f.msg = "empty distance tree with lengths"), (u = at)),
                  u)
                : 0)
        )
      })
  }
  function ht() {
    const t = this
    let e,
      n,
      i,
      a,
      r = 0,
      s = 0,
      l = 0,
      o = 0,
      _ = 0,
      d = 0,
      c = 0,
      f = 0,
      u = 0,
      h = 0
    function b(t, e, n, i, a, r, s, l) {
      let o, _, d, c, f, u, h, b, p, w, x, g, y, m, k, v
      ;(h = l.next_in_index),
        (b = l.avail_in),
        (f = s.bitb),
        (u = s.bitk),
        (p = s.write),
        (w = p < s.read ? s.read - p - 1 : s.end - p),
        (x = st[t]),
        (g = st[e])
      do {
        for (; 20 > u; ) b--, (f |= (255 & l.read_byte(h++)) << u), (u += 8)
        if (((o = f & x), (_ = n), (d = i), (v = 3 * (d + o)), 0 !== (c = _[v])))
          for (;;) {
            if (((f >>= _[v + 1]), (u -= _[v + 1]), 0 != (16 & c))) {
              for (c &= 15, y = _[v + 2] + (f & st[c]), f >>= c, u -= c; 15 > u; )
                b--, (f |= (255 & l.read_byte(h++)) << u), (u += 8)
              for (o = f & g, _ = a, d = r, v = 3 * (d + o), c = _[v]; ; ) {
                if (((f >>= _[v + 1]), (u -= _[v + 1]), 0 != (16 & c))) {
                  for (c &= 15; c > u; ) b--, (f |= (255 & l.read_byte(h++)) << u), (u += 8)
                  if (((m = _[v + 2] + (f & st[c])), (f >>= c), (u -= c), (w -= y), m > p)) {
                    k = p - m
                    do {
                      k += s.end
                    } while (0 > k)
                    if (((c = s.end - k), y > c)) {
                      if (((y -= c), p - k > 0 && c > p - k))
                        do {
                          s.window[p++] = s.window[k++]
                        } while (0 != --c)
                      else s.window.set(s.window.subarray(k, k + c), p), (p += c), (k += c), (c = 0)
                      k = 0
                    }
                  } else
                    (k = p - m),
                      p - k > 0 && 2 > p - k
                        ? ((s.window[p++] = s.window[k++]), (s.window[p++] = s.window[k++]), (y -= 2))
                        : (s.window.set(s.window.subarray(k, k + 2), p), (p += 2), (k += 2), (y -= 2))
                  if (p - k > 0 && y > p - k)
                    do {
                      s.window[p++] = s.window[k++]
                    } while (0 != --y)
                  else s.window.set(s.window.subarray(k, k + y), p), (p += y), (k += y), (y = 0)
                  break
                }
                if (0 != (64 & c))
                  return (
                    (l.msg = "invalid distance code"),
                    (y = l.avail_in - b),
                    (y = y > u >> 3 ? u >> 3 : y),
                    (b += y),
                    (h -= y),
                    (u -= y << 3),
                    (s.bitb = f),
                    (s.bitk = u),
                    (l.avail_in = b),
                    (l.total_in += h - l.next_in_index),
                    (l.next_in_index = h),
                    (s.write = p),
                    at
                  )
                ;(o += _[v + 2]), (o += f & st[c]), (v = 3 * (d + o)), (c = _[v])
              }
              break
            }
            if (0 != (64 & c))
              return 0 != (32 & c)
                ? ((y = l.avail_in - b),
                  (y = y > u >> 3 ? u >> 3 : y),
                  (b += y),
                  (h -= y),
                  (u -= y << 3),
                  (s.bitb = f),
                  (s.bitk = u),
                  (l.avail_in = b),
                  (l.total_in += h - l.next_in_index),
                  (l.next_in_index = h),
                  (s.write = p),
                  1)
                : ((l.msg = "invalid literal/length code"),
                  (y = l.avail_in - b),
                  (y = y > u >> 3 ? u >> 3 : y),
                  (b += y),
                  (h -= y),
                  (u -= y << 3),
                  (s.bitb = f),
                  (s.bitk = u),
                  (l.avail_in = b),
                  (l.total_in += h - l.next_in_index),
                  (l.next_in_index = h),
                  (s.write = p),
                  at)
            if (((o += _[v + 2]), (o += f & st[c]), (v = 3 * (d + o)), 0 === (c = _[v]))) {
              ;(f >>= _[v + 1]), (u -= _[v + 1]), (s.window[p++] = _[v + 2]), w--
              break
            }
          }
        else (f >>= _[v + 1]), (u -= _[v + 1]), (s.window[p++] = _[v + 2]), w--
      } while (w >= 258 && b >= 10)
      return (
        (y = l.avail_in - b),
        (y = y > u >> 3 ? u >> 3 : y),
        (b += y),
        (h -= y),
        (u -= y << 3),
        (s.bitb = f),
        (s.bitk = u),
        (l.avail_in = b),
        (l.total_in += h - l.next_in_index),
        (l.next_in_index = h),
        (s.write = p),
        0
      )
    }
    ;(t.init = (t, r, s, l, o, _) => {
      ;(e = 0), (c = t), (f = r), (i = s), (u = l), (a = o), (h = _), (n = null)
    }),
      (t.proc = (t, p, w) => {
        let x,
          g,
          y,
          m,
          k,
          v,
          A,
          U = 0,
          S = 0,
          z = 0
        for (
          z = p.next_in_index,
            m = p.avail_in,
            U = t.bitb,
            S = t.bitk,
            k = t.write,
            v = k < t.read ? t.read - k - 1 : t.end - k;
          ;

        )
          switch (e) {
            case 0:
              if (
                v >= 258 &&
                m >= 10 &&
                ((t.bitb = U),
                (t.bitk = S),
                (p.avail_in = m),
                (p.total_in += z - p.next_in_index),
                (p.next_in_index = z),
                (t.write = k),
                (w = b(c, f, i, u, a, h, t, p)),
                (z = p.next_in_index),
                (m = p.avail_in),
                (U = t.bitb),
                (S = t.bitk),
                (k = t.write),
                (v = k < t.read ? t.read - k - 1 : t.end - k),
                0 != w)
              ) {
                e = 1 == w ? 7 : 9
                break
              }
              ;(l = c), (n = i), (s = u), (e = 1)
            case 1:
              for (x = l; x > S; ) {
                if (0 === m)
                  return (
                    (t.bitb = U),
                    (t.bitk = S),
                    (p.avail_in = m),
                    (p.total_in += z - p.next_in_index),
                    (p.next_in_index = z),
                    (t.write = k),
                    t.inflate_flush(p, w)
                  )
                ;(w = 0), m--, (U |= (255 & p.read_byte(z++)) << S), (S += 8)
              }
              if (((g = 3 * (s + (U & st[x]))), (U >>>= n[g + 1]), (S -= n[g + 1]), (y = n[g]), 0 === y)) {
                ;(o = n[g + 2]), (e = 6)
                break
              }
              if (0 != (16 & y)) {
                ;(_ = 15 & y), (r = n[g + 2]), (e = 2)
                break
              }
              if (0 == (64 & y)) {
                ;(l = y), (s = g / 3 + n[g + 2])
                break
              }
              if (0 != (32 & y)) {
                e = 7
                break
              }
              return (
                (e = 9),
                (p.msg = "invalid literal/length code"),
                (w = at),
                (t.bitb = U),
                (t.bitk = S),
                (p.avail_in = m),
                (p.total_in += z - p.next_in_index),
                (p.next_in_index = z),
                (t.write = k),
                t.inflate_flush(p, w)
              )
            case 2:
              for (x = _; x > S; ) {
                if (0 === m)
                  return (
                    (t.bitb = U),
                    (t.bitk = S),
                    (p.avail_in = m),
                    (p.total_in += z - p.next_in_index),
                    (p.next_in_index = z),
                    (t.write = k),
                    t.inflate_flush(p, w)
                  )
                ;(w = 0), m--, (U |= (255 & p.read_byte(z++)) << S), (S += 8)
              }
              ;(r += U & st[x]), (U >>= x), (S -= x), (l = f), (n = a), (s = h), (e = 3)
            case 3:
              for (x = l; x > S; ) {
                if (0 === m)
                  return (
                    (t.bitb = U),
                    (t.bitk = S),
                    (p.avail_in = m),
                    (p.total_in += z - p.next_in_index),
                    (p.next_in_index = z),
                    (t.write = k),
                    t.inflate_flush(p, w)
                  )
                ;(w = 0), m--, (U |= (255 & p.read_byte(z++)) << S), (S += 8)
              }
              if (((g = 3 * (s + (U & st[x]))), (U >>= n[g + 1]), (S -= n[g + 1]), (y = n[g]), 0 != (16 & y))) {
                ;(_ = 15 & y), (d = n[g + 2]), (e = 4)
                break
              }
              if (0 == (64 & y)) {
                ;(l = y), (s = g / 3 + n[g + 2])
                break
              }
              return (
                (e = 9),
                (p.msg = "invalid distance code"),
                (w = at),
                (t.bitb = U),
                (t.bitk = S),
                (p.avail_in = m),
                (p.total_in += z - p.next_in_index),
                (p.next_in_index = z),
                (t.write = k),
                t.inflate_flush(p, w)
              )
            case 4:
              for (x = _; x > S; ) {
                if (0 === m)
                  return (
                    (t.bitb = U),
                    (t.bitk = S),
                    (p.avail_in = m),
                    (p.total_in += z - p.next_in_index),
                    (p.next_in_index = z),
                    (t.write = k),
                    t.inflate_flush(p, w)
                  )
                ;(w = 0), m--, (U |= (255 & p.read_byte(z++)) << S), (S += 8)
              }
              ;(d += U & st[x]), (U >>= x), (S -= x), (e = 5)
            case 5:
              for (A = k - d; 0 > A; ) A += t.end
              for (; 0 !== r; ) {
                if (
                  0 === v &&
                  (k == t.end && 0 !== t.read && ((k = 0), (v = k < t.read ? t.read - k - 1 : t.end - k)),
                  0 === v &&
                    ((t.write = k),
                    (w = t.inflate_flush(p, w)),
                    (k = t.write),
                    (v = k < t.read ? t.read - k - 1 : t.end - k),
                    k == t.end && 0 !== t.read && ((k = 0), (v = k < t.read ? t.read - k - 1 : t.end - k)),
                    0 === v))
                )
                  return (
                    (t.bitb = U),
                    (t.bitk = S),
                    (p.avail_in = m),
                    (p.total_in += z - p.next_in_index),
                    (p.next_in_index = z),
                    (t.write = k),
                    t.inflate_flush(p, w)
                  )
                ;(t.window[k++] = t.window[A++]), v--, A == t.end && (A = 0), r--
              }
              e = 0
              break
            case 6:
              if (
                0 === v &&
                (k == t.end && 0 !== t.read && ((k = 0), (v = k < t.read ? t.read - k - 1 : t.end - k)),
                0 === v &&
                  ((t.write = k),
                  (w = t.inflate_flush(p, w)),
                  (k = t.write),
                  (v = k < t.read ? t.read - k - 1 : t.end - k),
                  k == t.end && 0 !== t.read && ((k = 0), (v = k < t.read ? t.read - k - 1 : t.end - k)),
                  0 === v))
              )
                return (
                  (t.bitb = U),
                  (t.bitk = S),
                  (p.avail_in = m),
                  (p.total_in += z - p.next_in_index),
                  (p.next_in_index = z),
                  (t.write = k),
                  t.inflate_flush(p, w)
                )
              ;(w = 0), (t.window[k++] = o), v--, (e = 0)
              break
            case 7:
              if (
                (S > 7 && ((S -= 8), m++, z--),
                (t.write = k),
                (w = t.inflate_flush(p, w)),
                (k = t.write),
                (v = k < t.read ? t.read - k - 1 : t.end - k),
                t.read != t.write)
              )
                return (
                  (t.bitb = U),
                  (t.bitk = S),
                  (p.avail_in = m),
                  (p.total_in += z - p.next_in_index),
                  (p.next_in_index = z),
                  (t.write = k),
                  t.inflate_flush(p, w)
                )
              e = 8
            case 8:
              return (
                (w = 1),
                (t.bitb = U),
                (t.bitk = S),
                (p.avail_in = m),
                (p.total_in += z - p.next_in_index),
                (p.next_in_index = z),
                (t.write = k),
                t.inflate_flush(p, w)
              )
            case 9:
              return (
                (w = at),
                (t.bitb = U),
                (t.bitk = S),
                (p.avail_in = m),
                (p.total_in += z - p.next_in_index),
                (p.next_in_index = z),
                (t.write = k),
                t.inflate_flush(p, w)
              )
            default:
              return (
                (w = it),
                (t.bitb = U),
                (t.bitk = S),
                (p.avail_in = m),
                (p.total_in += z - p.next_in_index),
                (p.next_in_index = z),
                (t.write = k),
                t.inflate_flush(p, w)
              )
          }
      }),
      (t.free = () => {})
  }
  ut.inflate_trees_fixed = (t, e, n, i) => ((t[0] = 9), (e[0] = 5), (n[0] = lt), (i[0] = ot), 0)
  const bt = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15]
  function pt(t, e) {
    const n = this
    let i,
      a = 0,
      r = 0,
      s = 0,
      l = 0
    const o = [0],
      _ = [0],
      d = new ht()
    let c = 0,
      f = new Int32Array(4320)
    const u = new ut()
    ;(n.bitk = 0),
      (n.bitb = 0),
      (n.window = new Uint8Array(e)),
      (n.end = e),
      (n.read = 0),
      (n.write = 0),
      (n.reset = (t, e) => {
        e && (e[0] = 0), 6 == a && d.free(t), (a = 0), (n.bitk = 0), (n.bitb = 0), (n.read = n.write = 0)
      }),
      n.reset(t, null),
      (n.inflate_flush = (t, e) => {
        let i, a, r
        return (
          (a = t.next_out_index),
          (r = n.read),
          (i = (r > n.write ? n.end : n.write) - r),
          i > t.avail_out && (i = t.avail_out),
          0 !== i && e == rt && (e = 0),
          (t.avail_out -= i),
          (t.total_out += i),
          t.next_out.set(n.window.subarray(r, r + i), a),
          (a += i),
          (r += i),
          r == n.end &&
            ((r = 0),
            n.write == n.end && (n.write = 0),
            (i = n.write - r),
            i > t.avail_out && (i = t.avail_out),
            0 !== i && e == rt && (e = 0),
            (t.avail_out -= i),
            (t.total_out += i),
            t.next_out.set(n.window.subarray(r, r + i), a),
            (a += i),
            (r += i)),
          (t.next_out_index = a),
          (n.read = r),
          e
        )
      }),
      (n.proc = (t, e) => {
        let h, b, p, w, x, g, y, m
        for (
          w = t.next_in_index,
            x = t.avail_in,
            b = n.bitb,
            p = n.bitk,
            g = n.write,
            y = g < n.read ? n.read - g - 1 : n.end - g;
          ;

        ) {
          let k, v, A, U, S, z, E, I
          switch (a) {
            case 0:
              for (; 3 > p; ) {
                if (0 === x)
                  return (
                    (n.bitb = b),
                    (n.bitk = p),
                    (t.avail_in = x),
                    (t.total_in += w - t.next_in_index),
                    (t.next_in_index = w),
                    (n.write = g),
                    n.inflate_flush(t, e)
                  )
                ;(e = 0), x--, (b |= (255 & t.read_byte(w++)) << p), (p += 8)
              }
              switch (((h = 7 & b), (c = 1 & h), h >>> 1)) {
                case 0:
                  ;(b >>>= 3), (p -= 3), (h = 7 & p), (b >>>= h), (p -= h), (a = 1)
                  break
                case 1:
                  ;(k = []),
                    (v = []),
                    (A = [[]]),
                    (U = [[]]),
                    ut.inflate_trees_fixed(k, v, A, U),
                    d.init(k[0], v[0], A[0], 0, U[0], 0),
                    (b >>>= 3),
                    (p -= 3),
                    (a = 6)
                  break
                case 2:
                  ;(b >>>= 3), (p -= 3), (a = 3)
                  break
                case 3:
                  return (
                    (b >>>= 3),
                    (p -= 3),
                    (a = 9),
                    (t.msg = "invalid block type"),
                    (e = at),
                    (n.bitb = b),
                    (n.bitk = p),
                    (t.avail_in = x),
                    (t.total_in += w - t.next_in_index),
                    (t.next_in_index = w),
                    (n.write = g),
                    n.inflate_flush(t, e)
                  )
              }
              break
            case 1:
              for (; 32 > p; ) {
                if (0 === x)
                  return (
                    (n.bitb = b),
                    (n.bitk = p),
                    (t.avail_in = x),
                    (t.total_in += w - t.next_in_index),
                    (t.next_in_index = w),
                    (n.write = g),
                    n.inflate_flush(t, e)
                  )
                ;(e = 0), x--, (b |= (255 & t.read_byte(w++)) << p), (p += 8)
              }
              if (((~b >>> 16) & 65535) != (65535 & b))
                return (
                  (a = 9),
                  (t.msg = "invalid stored block lengths"),
                  (e = at),
                  (n.bitb = b),
                  (n.bitk = p),
                  (t.avail_in = x),
                  (t.total_in += w - t.next_in_index),
                  (t.next_in_index = w),
                  (n.write = g),
                  n.inflate_flush(t, e)
                )
              ;(r = 65535 & b), (b = p = 0), (a = 0 !== r ? 2 : 0 !== c ? 7 : 0)
              break
            case 2:
              if (0 === x)
                return (
                  (n.bitb = b),
                  (n.bitk = p),
                  (t.avail_in = x),
                  (t.total_in += w - t.next_in_index),
                  (t.next_in_index = w),
                  (n.write = g),
                  n.inflate_flush(t, e)
                )
              if (
                0 === y &&
                (g == n.end && 0 !== n.read && ((g = 0), (y = g < n.read ? n.read - g - 1 : n.end - g)),
                0 === y &&
                  ((n.write = g),
                  (e = n.inflate_flush(t, e)),
                  (g = n.write),
                  (y = g < n.read ? n.read - g - 1 : n.end - g),
                  g == n.end && 0 !== n.read && ((g = 0), (y = g < n.read ? n.read - g - 1 : n.end - g)),
                  0 === y))
              )
                return (
                  (n.bitb = b),
                  (n.bitk = p),
                  (t.avail_in = x),
                  (t.total_in += w - t.next_in_index),
                  (t.next_in_index = w),
                  (n.write = g),
                  n.inflate_flush(t, e)
                )
              if (
                ((e = 0),
                (h = r),
                h > x && (h = x),
                h > y && (h = y),
                n.window.set(t.read_buf(w, h), g),
                (w += h),
                (x -= h),
                (g += h),
                (y -= h),
                0 != (r -= h))
              )
                break
              a = 0 !== c ? 7 : 0
              break
            case 3:
              for (; 14 > p; ) {
                if (0 === x)
                  return (
                    (n.bitb = b),
                    (n.bitk = p),
                    (t.avail_in = x),
                    (t.total_in += w - t.next_in_index),
                    (t.next_in_index = w),
                    (n.write = g),
                    n.inflate_flush(t, e)
                  )
                ;(e = 0), x--, (b |= (255 & t.read_byte(w++)) << p), (p += 8)
              }
              if (((s = h = 16383 & b), (31 & h) > 29 || ((h >> 5) & 31) > 29))
                return (
                  (a = 9),
                  (t.msg = "too many length or distance symbols"),
                  (e = at),
                  (n.bitb = b),
                  (n.bitk = p),
                  (t.avail_in = x),
                  (t.total_in += w - t.next_in_index),
                  (t.next_in_index = w),
                  (n.write = g),
                  n.inflate_flush(t, e)
                )
              if (((h = 258 + (31 & h) + ((h >> 5) & 31)), !i || i.length < h)) i = []
              else for (m = 0; h > m; m++) i[m] = 0
              ;(b >>>= 14), (p -= 14), (l = 0), (a = 4)
            case 4:
              for (; 4 + (s >>> 10) > l; ) {
                for (; 3 > p; ) {
                  if (0 === x)
                    return (
                      (n.bitb = b),
                      (n.bitk = p),
                      (t.avail_in = x),
                      (t.total_in += w - t.next_in_index),
                      (t.next_in_index = w),
                      (n.write = g),
                      n.inflate_flush(t, e)
                    )
                  ;(e = 0), x--, (b |= (255 & t.read_byte(w++)) << p), (p += 8)
                }
                ;(i[bt[l++]] = 7 & b), (b >>>= 3), (p -= 3)
              }
              for (; 19 > l; ) i[bt[l++]] = 0
              if (((o[0] = 7), (h = u.inflate_trees_bits(i, o, _, f, t)), 0 != h))
                return (
                  (e = h) == at && ((i = null), (a = 9)),
                  (n.bitb = b),
                  (n.bitk = p),
                  (t.avail_in = x),
                  (t.total_in += w - t.next_in_index),
                  (t.next_in_index = w),
                  (n.write = g),
                  n.inflate_flush(t, e)
                )
              ;(l = 0), (a = 5)
            case 5:
              for (; (h = s), 258 + (31 & h) + ((h >> 5) & 31) > l; ) {
                let r, d
                for (h = o[0]; h > p; ) {
                  if (0 === x)
                    return (
                      (n.bitb = b),
                      (n.bitk = p),
                      (t.avail_in = x),
                      (t.total_in += w - t.next_in_index),
                      (t.next_in_index = w),
                      (n.write = g),
                      n.inflate_flush(t, e)
                    )
                  ;(e = 0), x--, (b |= (255 & t.read_byte(w++)) << p), (p += 8)
                }
                if (((h = f[3 * (_[0] + (b & st[h])) + 1]), (d = f[3 * (_[0] + (b & st[h])) + 2]), 16 > d))
                  (b >>>= h), (p -= h), (i[l++] = d)
                else {
                  for (m = 18 == d ? 7 : d - 14, r = 18 == d ? 11 : 3; h + m > p; ) {
                    if (0 === x)
                      return (
                        (n.bitb = b),
                        (n.bitk = p),
                        (t.avail_in = x),
                        (t.total_in += w - t.next_in_index),
                        (t.next_in_index = w),
                        (n.write = g),
                        n.inflate_flush(t, e)
                      )
                    ;(e = 0), x--, (b |= (255 & t.read_byte(w++)) << p), (p += 8)
                  }
                  if (
                    ((b >>>= h),
                    (p -= h),
                    (r += b & st[m]),
                    (b >>>= m),
                    (p -= m),
                    (m = l),
                    (h = s),
                    m + r > 258 + (31 & h) + ((h >> 5) & 31) || (16 == d && 1 > m))
                  )
                    return (
                      (i = null),
                      (a = 9),
                      (t.msg = "invalid bit length repeat"),
                      (e = at),
                      (n.bitb = b),
                      (n.bitk = p),
                      (t.avail_in = x),
                      (t.total_in += w - t.next_in_index),
                      (t.next_in_index = w),
                      (n.write = g),
                      n.inflate_flush(t, e)
                    )
                  d = 16 == d ? i[m - 1] : 0
                  do {
                    i[m++] = d
                  } while (0 != --r)
                  l = m
                }
              }
              if (
                ((_[0] = -1),
                (S = []),
                (z = []),
                (E = []),
                (I = []),
                (S[0] = 9),
                (z[0] = 6),
                (h = s),
                (h = u.inflate_trees_dynamic(257 + (31 & h), 1 + ((h >> 5) & 31), i, S, z, E, I, f, t)),
                0 != h)
              )
                return (
                  h == at && ((i = null), (a = 9)),
                  (e = h),
                  (n.bitb = b),
                  (n.bitk = p),
                  (t.avail_in = x),
                  (t.total_in += w - t.next_in_index),
                  (t.next_in_index = w),
                  (n.write = g),
                  n.inflate_flush(t, e)
                )
              d.init(S[0], z[0], f, E[0], f, I[0]), (a = 6)
            case 6:
              if (
                ((n.bitb = b),
                (n.bitk = p),
                (t.avail_in = x),
                (t.total_in += w - t.next_in_index),
                (t.next_in_index = w),
                (n.write = g),
                1 != (e = d.proc(n, t, e)))
              )
                return n.inflate_flush(t, e)
              if (
                ((e = 0),
                d.free(t),
                (w = t.next_in_index),
                (x = t.avail_in),
                (b = n.bitb),
                (p = n.bitk),
                (g = n.write),
                (y = g < n.read ? n.read - g - 1 : n.end - g),
                0 === c)
              ) {
                a = 0
                break
              }
              a = 7
            case 7:
              if (
                ((n.write = g),
                (e = n.inflate_flush(t, e)),
                (g = n.write),
                (y = g < n.read ? n.read - g - 1 : n.end - g),
                n.read != n.write)
              )
                return (
                  (n.bitb = b),
                  (n.bitk = p),
                  (t.avail_in = x),
                  (t.total_in += w - t.next_in_index),
                  (t.next_in_index = w),
                  (n.write = g),
                  n.inflate_flush(t, e)
                )
              a = 8
            case 8:
              return (
                (e = 1),
                (n.bitb = b),
                (n.bitk = p),
                (t.avail_in = x),
                (t.total_in += w - t.next_in_index),
                (t.next_in_index = w),
                (n.write = g),
                n.inflate_flush(t, e)
              )
            case 9:
              return (
                (e = at),
                (n.bitb = b),
                (n.bitk = p),
                (t.avail_in = x),
                (t.total_in += w - t.next_in_index),
                (t.next_in_index = w),
                (n.write = g),
                n.inflate_flush(t, e)
              )
            default:
              return (
                (e = it),
                (n.bitb = b),
                (n.bitk = p),
                (t.avail_in = x),
                (t.total_in += w - t.next_in_index),
                (t.next_in_index = w),
                (n.write = g),
                n.inflate_flush(t, e)
              )
          }
        }
      }),
      (n.free = (t) => {
        n.reset(t, null), (n.window = null), (f = null)
      }),
      (n.set_dictionary = (t, e, i) => {
        n.window.set(t.subarray(e, e + i), 0), (n.read = n.write = i)
      }),
      (n.sync_point = () => (1 == a ? 1 : 0))
  }
  const wt = 13,
    xt = [0, 0, 255, 255]
  function gt() {
    const t = this
    function e(t) {
      return t && t.istate
        ? ((t.total_in = t.total_out = 0), (t.msg = null), (t.istate.mode = 7), t.istate.blocks.reset(t, null), 0)
        : it
    }
    ;(t.mode = 0),
      (t.method = 0),
      (t.was = [0]),
      (t.need = 0),
      (t.marker = 0),
      (t.wbits = 0),
      (t.inflateEnd = (e) => (t.blocks && t.blocks.free(e), (t.blocks = null), 0)),
      (t.inflateInit = (n, i) => (
        (n.msg = null),
        (t.blocks = null),
        8 > i || i > 15 ? (t.inflateEnd(n), it) : ((t.wbits = i), (n.istate.blocks = new pt(n, 1 << i)), e(n), 0)
      )),
      (t.inflate = (t, e) => {
        let n, i
        if (!t || !t.istate || !t.next_in) return it
        const a = t.istate
        for (e = 4 == e ? rt : 0, n = rt; ; )
          switch (a.mode) {
            case 0:
              if (0 === t.avail_in) return n
              if (((n = e), t.avail_in--, t.total_in++, 8 != (15 & (a.method = t.read_byte(t.next_in_index++))))) {
                ;(a.mode = wt), (t.msg = "unknown compression method"), (a.marker = 5)
                break
              }
              if (8 + (a.method >> 4) > a.wbits) {
                ;(a.mode = wt), (t.msg = "invalid window size"), (a.marker = 5)
                break
              }
              a.mode = 1
            case 1:
              if (0 === t.avail_in) return n
              if (
                ((n = e),
                t.avail_in--,
                t.total_in++,
                (i = 255 & t.read_byte(t.next_in_index++)),
                ((a.method << 8) + i) % 31 != 0)
              ) {
                ;(a.mode = wt), (t.msg = "incorrect header check"), (a.marker = 5)
                break
              }
              if (0 == (32 & i)) {
                a.mode = 7
                break
              }
              a.mode = 2
            case 2:
              if (0 === t.avail_in) return n
              ;(n = e),
                t.avail_in--,
                t.total_in++,
                (a.need = ((255 & t.read_byte(t.next_in_index++)) << 24) & 4278190080),
                (a.mode = 3)
            case 3:
              if (0 === t.avail_in) return n
              ;(n = e),
                t.avail_in--,
                t.total_in++,
                (a.need += ((255 & t.read_byte(t.next_in_index++)) << 16) & 16711680),
                (a.mode = 4)
            case 4:
              if (0 === t.avail_in) return n
              ;(n = e),
                t.avail_in--,
                t.total_in++,
                (a.need += ((255 & t.read_byte(t.next_in_index++)) << 8) & 65280),
                (a.mode = 5)
            case 5:
              return 0 === t.avail_in
                ? n
                : ((n = e),
                  t.avail_in--,
                  t.total_in++,
                  (a.need += 255 & t.read_byte(t.next_in_index++)),
                  (a.mode = 6),
                  2)
            case 6:
              return (a.mode = wt), (t.msg = "need dictionary"), (a.marker = 0), it
            case 7:
              if (((n = a.blocks.proc(t, n)), n == at)) {
                ;(a.mode = wt), (a.marker = 0)
                break
              }
              if ((0 == n && (n = e), 1 != n)) return n
              ;(n = e), a.blocks.reset(t, a.was), (a.mode = 12)
            case 12:
              return 1
            case wt:
              return at
            default:
              return it
          }
      }),
      (t.inflateSetDictionary = (t, e, n) => {
        let i = 0,
          a = n
        if (!t || !t.istate || 6 != t.istate.mode) return it
        const r = t.istate
        return (
          a < 1 << r.wbits || ((a = (1 << r.wbits) - 1), (i = n - a)), r.blocks.set_dictionary(e, i, a), (r.mode = 7), 0
        )
      }),
      (t.inflateSync = (t) => {
        let n, i, a, r, s
        if (!t || !t.istate) return it
        const l = t.istate
        if ((l.mode != wt && ((l.mode = wt), (l.marker = 0)), 0 === (n = t.avail_in))) return rt
        for (i = t.next_in_index, a = l.marker; 0 !== n && 4 > a; )
          t.read_byte(i) == xt[a] ? a++ : (a = 0 !== t.read_byte(i) ? 0 : 4 - a), i++, n--
        return (
          (t.total_in += i - t.next_in_index),
          (t.next_in_index = i),
          (t.avail_in = n),
          (l.marker = a),
          4 != a
            ? at
            : ((r = t.total_in), (s = t.total_out), e(t), (t.total_in = r), (t.total_out = s), (l.mode = 7), 0)
        )
      }),
      (t.inflateSyncPoint = (t) => (t && t.istate && t.istate.blocks ? t.istate.blocks.sync_point() : it))
  }
  function yt() {}
  function mt(t) {
    const e = new yt(),
      n = t && t.chunkSize ? Math.floor(2 * t.chunkSize) : 131072,
      i = new Uint8Array(n)
    let a = !1
    e.inflateInit(),
      (e.next_out = i),
      (this.append = (t, r) => {
        const s = []
        let l,
          o,
          _ = 0,
          d = 0,
          c = 0
        if (0 !== t.length) {
          ;(e.next_in_index = 0), (e.next_in = t), (e.avail_in = t.length)
          do {
            if (
              ((e.next_out_index = 0),
              (e.avail_out = n),
              0 !== e.avail_in || a || ((e.next_in_index = 0), (a = !0)),
              (l = e.inflate(0)),
              a && l === rt)
            ) {
              if (0 !== e.avail_in) throw Error("inflating: bad input")
            } else if (0 !== l && 1 !== l) throw Error("inflating: " + e.msg)
            if ((a || 1 === l) && e.avail_in === t.length) throw Error("inflating: bad input")
            e.next_out_index &&
              (e.next_out_index === n ? s.push(new Uint8Array(i)) : s.push(i.slice(0, e.next_out_index))),
              (c += e.next_out_index),
              r && e.next_in_index > 0 && e.next_in_index != _ && (r(e.next_in_index), (_ = e.next_in_index))
          } while (e.avail_in > 0 || 0 === e.avail_out)
          return (
            s.length > 1
              ? ((o = new Uint8Array(c)),
                s.forEach((t) => {
                  o.set(t, d), (d += t.length)
                }))
              : (o = s[0] || new Uint8Array(0)),
            o
          )
        }
      }),
      (this.flush = () => {
        e.inflateEnd()
      })
  }
  ;(yt.prototype = {
    inflateInit: function (t) {
      const e = this
      return (e.istate = new gt()), t || (t = 15), e.istate.inflateInit(e, t)
    },
    inflate: function (t) {
      const e = this
      return e.istate ? e.istate.inflate(e, t) : it
    },
    inflateEnd: function () {
      const t = this
      if (!t.istate) return it
      const e = t.istate.inflateEnd(t)
      return (t.istate = null), e
    },
    inflateSync: function () {
      const t = this
      return t.istate ? t.istate.inflateSync(t) : it
    },
    inflateSetDictionary: function (t, e) {
      const n = this
      return n.istate ? n.istate.inflateSetDictionary(n, t, e) : it
    },
    read_byte: function (t) {
      return this.next_in[t]
    },
    read_buf: function (t, e) {
      return this.next_in.subarray(t, t + e)
    },
  }),
    (self.initCodec = () => {
      ;(self.Deflate = nt), (self.Inflate = mt)
    })
})()
