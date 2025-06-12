---
layout: doc
title: "空集合の存在証明"
---

# 空集合の存在証明

集合論における以下の公理から空集合の存在を証明します．

::: tip 空集合の存在証明に必要な公理
- **集合の存在公理**
- **包公理図式**
:::


## 空集合の存在証明に必要な公理

集合論を構築する際に，「空集合公理」を採用し，証明なしで空集合を扱うという立場があります[^wiki]．

[^wiki]: [Wikipedia 空集合の公理
](https://ja.wikipedia.org/wiki/%E7%A9%BA%E9%9B%86%E5%90%88%E3%81%AE%E5%85%AC%E7%90%86)

しかし，空集合の存在と一意性は**集合の存在公理**，**内包公理図式**,**外延性公理**から証明できる定理なので，あえて公理として認める必要もありません．

### 集合の存在公理

::: tip 集合の存在公理
\begin{align*}
  \exists x (x = x)
\end{align*}
:::
私たちが考える集合の世界に，少なくとも一つの集合があると認める公理です．


### 包公理図式

::: tip 内包公理図式
\(y\) を自由変数として含まない論理式 \(\varphi\) ごとに，任意の集合\(z\)に対し
\begin{align*}
  \forall z [\exists y \forall x (x \in y \leftrightarrow x \in z \land \varphi)]
\end{align*}
:::
ある集合 \(z\) の中から， \(\varphi(x)\) を満たすものを集めて新たに集合 \(y\) を作り出すことができるということです．

## 空集合であることを表す論理式

以下の記述を簡潔にするために「集合\(x\)が空集合である」ということを表す論理式\({\rm{emp}}(x)\)を定義しましょう．

感覚的には\(x\) が空集合であれば，どのような元も\(x\)には属さないのですから，次のように書くことができます．

::: info \({\rm{emp}}(x)\)の定義
\begin{align*}
  {\rm{emp}}(x) \equiv \forall z (z \not \in x)
\end{align*}
:::

ここで\(z \not \in x\) は \(\neg (z \in x)\)の略記であることに注意して下さい．

## 空集合の存在証明

空集合の存在を証明しましょう．

ある集合 \(z\) を任意に固定します．

内包公理図式を適用する際の論理式\(\varphi\)として，**集合の存在公理**に矛盾するようなもの，すなわち\(\neg \exists x (x = x)\) を採用します．

\begin{align*}
  \varphi \equiv \neg \exists x (x = x)
\end{align*}

そうすると、**内包公理図式**から全称記号\(\forall\)と存在記号\(\exists\)を覗いた部分は次のようにかけます．
\begin{align*}
  x \in y \leftrightarrow x \in z \land \neg \exists x (x = x)
\end{align*}

\(\leftrightarrow\) の右側を意味論的同値に変形しましょう．

\(\land\) の除去規則から \(\neg \exists x (x = x)\) を導出します．

また，閉じることのない仮定，すなわち前提として**集合の存在公理**がありました．


以上２つの論理式に矛盾の導入規則を適用すると

\begin{prooftree}
\AxiomC{$\exists x (x = x)$}
\AxiomC{$\neg \exists x (x = x)$}
\BinaryInfC{$\bot$}
\end{prooftree}

となり，矛盾\(\bot\) が導けました．

以上で，論理式
\begin{align*}
  & \qquad \  x \in y \leftrightarrow \bot \\
 & \quad \Leftrightarrow x \in y \rightarrow \bot \land \bot \rightarrow x \in y\\
\end{align*}

が導けました．

最後の論理式のうち，\(\bot \rightarrow x \in y\) は爆発律そのものなので意味論的同値を保った変形では無視できます．

\(x \in y \rightarrow \bot\)は背理法を用いて\(\neg (x \in y)\)すなわち\(x \not \in y\)と変形できます．

以上から\(\exists y \forall x (x \not \in y)\)すなわち
\begin{align*}
  \exists y \ {\rm{emp}}(y)
\end{align*}
が導けました．

これは，空集合の性質を満たす集合\(y\) が存在することを表します．

## まとめ

- 空集合は集合の世界に存在する一つの集合です．
- 空集合の存在は**集合の存在公理**，**内包公理図式**から導けます．

この記事があなたの空集合に対する理解の助けになれば幸いです．

## 参考
- [キューネン数学基礎論講義](https://www.nippyo.co.jp/shop/book/7176.html)