---
layout: doc
title: "空集合の一意性証明"
---

# 空集合の一意性証明

**外延性公理**から空集合の一意性を証明します．


## 空集合の一意性証明に必要な公理

集合論に限らず、一意性を示す際には、

1. 2つの対象\(X,Y\)を任意にとる．
2. \(X=Y\)を示す．

という手順をとります．

集合における\(=\)という関係の示し方を与えているのが**外延性公理**です．

### 外延性公理
::: tip 外延性公理
任意の集合\(x,y\)に対し
\begin{align*}
  \forall z (z \in x \leftrightarrow z \in y) \to x = y
\end{align*}
:::

集合 \(z\) が集合 \(x\) に含まれることと，集合 \(y\) に含まれることが同値ならば，\(x\) と \(y\) は同一の集合であるということです．

## 空集合であることを表す論理式

以下，簡単のために「集合\(x\)が空集合である」ということを表す論理式\({\rm{emp}}(x)\)を次で定義します．

::: info \({\rm{emp}}(x)\)の定義
\begin{align*}
  {\rm{emp}}(x) \equiv \forall z (z \not \in x)
\end{align*}
:::


## 空集合の一意性証明

\(\exists y \, {\rm{emp}}(y)\)については，記事[空集合の存在証明](/posts/空集合論/existance-of-emptyset.md)で証明しています．

\(\exists y \, {\rm{emp}}(y)\)が証明できたとして、空集合の一意性を示しましょう．

ある集合 \(x, y\) がそれぞれ \({\rm{emp}}(x), {\rm{emp}}(y)\) を満たすとします．

ある集合 \(z\) について \(z \in x\) を仮定します．\({\rm{emp}}(x)\)より，
\begin{align*}
  z \in x \land z \not \in x \Leftrightarrow \bot
\end{align*}
が導けます．矛盾\(\bot\)からはいかなる論理式も導くことができるので，\(z \in y\)を導きましょう．以上で，次の論理式を導いたことになります．
\begin{align*}
  z \in x \to z \in y
\end{align*}

\(x\) と \(y\) の役割を入れ替えることで，全く同様に次の論理式を導くことが出来ます．
\begin{align*}
  z \in y \to z \in x
\end{align*}

集合 \(z\) は任意に選んだものだったので，次の論理式が導けました．
\begin{align*}
\forall z (z \in y \leftrightarrow z \in x)
\end{align*}

よって，外延性公理から\(x = y\) が従います．

これで，空集合の一意性が示せました．

## まとめ

- 空集合の一意性は**外延性公理**から導けます．

## 参考
- [キューネン数学基礎論講義](https://www.nippyo.co.jp/shop/book/7176.html)