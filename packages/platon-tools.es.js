function m(e) {
  if (Array.isArray(e)) {
    const t = [];
    let n = 0;
    for (let o = 0; o < e.length; o++) {
      const i = m(e[o]);
      t.push(i), n += i.length;
    }
    return d(y(n, 192), ...t);
  }
  const r = A(e);
  return r.length === 1 && r[0] < 128 ? r : d(y(r.length, 128), r);
}
function f(e, r, t) {
  if (t > e.length)
    throw new Error("invalid RLP (safeSlice): end slice of Uint8Array out-of-bounds");
  return e.slice(r, t);
}
function g(e) {
  if (e[0] === 0)
    throw new Error("invalid RLP: extra zeros");
  return E(b(e));
}
function y(e, r) {
  if (e < 56)
    return Uint8Array.from([e + r]);
  const t = h(e), n = t.length / 2, o = h(r + 55 + n);
  return Uint8Array.from(l(o + t));
}
function T(e, r = !1) {
  if (typeof e > "u" || e === null || e.length === 0)
    return Uint8Array.from([]);
  const t = A(e), n = u(t);
  if (r)
    return {
      data: n.data,
      remainder: n.remainder.slice()
    };
  if (n.remainder.length !== 0)
    throw new Error("invalid RLP: remainder must be zero");
  return n.data;
}
function u(e) {
  let r, t, n, o, i;
  const s = [], a = e[0];
  if (a <= 127)
    return {
      data: e.slice(0, 1),
      remainder: e.subarray(1)
    };
  if (a <= 183) {
    if (r = a - 127, a === 128 ? n = Uint8Array.from([]) : n = f(e, 1, r), r === 2 && n[0] < 128)
      throw new Error("invalid RLP encoding: invalid prefix, single byte < 0x80 are not prefixed");
    return {
      data: n,
      remainder: e.subarray(r)
    };
  } else if (a <= 191) {
    if (t = a - 182, e.length - 1 < t)
      throw new Error("invalid RLP: not enough bytes for string length");
    if (r = g(f(e, 1, t)), r <= 55)
      throw new Error("invalid RLP: expected string length to be greater than 55");
    return n = f(e, t, r + t), {
      data: n,
      remainder: e.subarray(r + t)
    };
  } else if (a <= 247) {
    for (r = a - 191, o = f(e, 1, r); o.length; )
      i = u(o), s.push(i.data), o = i.remainder;
    return {
      data: s,
      remainder: e.subarray(r)
    };
  } else {
    if (t = a - 246, r = g(f(e, 1, t)), r < 56)
      throw new Error("invalid RLP: encoded list too short");
    const c = t + r;
    if (c > e.length)
      throw new Error("invalid RLP: total length is larger than the data");
    for (o = f(e, t, c); o.length; )
      i = u(o), s.push(i.data), o = i.remainder;
    return {
      data: s,
      remainder: e.subarray(c)
    };
  }
}
const B = Array.from({ length: 256 }, (e, r) => r.toString(16).padStart(2, "0"));
function b(e) {
  let r = "";
  for (let t = 0; t < e.length; t++)
    r += B[e[t]];
  return r;
}
function E(e) {
  const r = Number.parseInt(e, 16);
  if (Number.isNaN(r))
    throw new Error("Invalid byte sequence");
  return r;
}
function l(e) {
  if (typeof e != "string")
    throw new TypeError("hexToBytes: expected string, got " + typeof e);
  if (e.length % 2)
    throw new Error("hexToBytes: received invalid unpadded hex");
  const r = new Uint8Array(e.length / 2);
  for (let t = 0; t < r.length; t++) {
    const n = t * 2;
    r[t] = E(e.slice(n, n + 2));
  }
  return r;
}
function d(...e) {
  if (e.length === 1)
    return e[0];
  const r = e.reduce((n, o) => n + o.length, 0), t = new Uint8Array(r);
  for (let n = 0, o = 0; n < e.length; n++) {
    const i = e[n];
    t.set(i, o), o += i.length;
  }
  return t;
}
function p(e) {
  return new TextEncoder().encode(e);
}
function h(e) {
  if (e < 0)
    throw new Error("Invalid integer as argument, must be unsigned!");
  const r = e.toString(16);
  return r.length % 2 ? `0${r}` : r;
}
function R(e) {
  return e.length % 2 ? `0${e}` : e;
}
function L(e) {
  return e.length >= 2 && e[0] === "0" && e[1] === "x";
}
function U(e) {
  return typeof e != "string" ? e : L(e) ? e.slice(2) : e;
}
function A(e) {
  if (e instanceof Uint8Array)
    return e;
  if (typeof e == "string")
    return L(e) ? l(R(U(e))) : p(e);
  if (typeof e == "number" || typeof e == "bigint")
    return e ? l(h(e)) : Uint8Array.from([]);
  if (e == null)
    return Uint8Array.from([]);
  throw new Error("toBytes: received unsupported type " + typeof e);
}
const x = {
  bytesToHex: b,
  concatBytes: d,
  hexToBytes: l,
  utf8ToBytes: p
}, w = { encode: m, decode: T }, P = (e) => {
  try {
    if (!e || isNaN(e)) throw new Error("Please check the parameters");
    if (e >= 1e3 && e < 2e3)
      return "0x1000000000000000000000000000000000000002";
    if (e >= 2e3 && e < 3e3)
      return "0x1000000000000000000000000000000000000005";
    if (e >= 3e3 && e < 4e3)
      return "0x1000000000000000000000000000000000000004";
    if (e >= 4e3 && e < 5e3)
      return "0x1000000000000000000000000000000000000001";
    if (e >= 5e3 && e < 6e3)
      return "0x1000000000000000000000000000000000000006";
    throw new Error("The contract corresponding to code cannot be found");
  } catch (r) {
    console.error("error:", r);
  }
}, H = (e) => {
  const r = [];
  for (const n of e)
    r.push("0x" + x.bytesToHex(w.encode(n)));
  return "0x" + x.bytesToHex(w.encode(r));
}, N = (e, r, t) => {
  try {
    if (!r || !t || t.length === 0)
      throw new Error("Function params error");
    return {
      from: r,
      to: P(e),
      data: H([e, ...t])
    };
  } catch (n) {
    console.error("error:", n);
  }
}, S = {
  getContractAddress: P,
  getParams: N
};
export {
  S as default
};
//# sourceMappingURL=platon-tools.es.js.map
