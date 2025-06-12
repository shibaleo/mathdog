---
layout: doc
title: "空集合はこわくない"
---

# 空集合はこわくない

高校数学では，集合は「ものの集まり」と習います．

一方で，空集合は「要素を持たない集合」と習います．

これはパラドックスですね．

このような記述では空集合が集合なのか，集合ではないのか，はっきりとした理解をすることが難しいでしょう．

## 空集合は様々な集合の中の一つに過ぎない

この記事では集合論の公理から空集合の存在と一意性が証明できることを紹介します．

空集合も一つの集合に過ぎないのだということを確認することで

「空集合ってなんだか捉えどころのないものだな」

という不安から解放され，空集合の扱いに自信を持てるようになっていただければ幸いです．

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

### 外延性公理
::: tip 外延性公理
任意の集合\(x,y\)に対し
\begin{align*}
  \forall z (z \in x \leftrightarrow z \in y) \to x = y
\end{align*}
:::

集合 \(z\) が集合 \(x\) に含まれることと，集合 \(y\) に含まれることが同値ならば，\(x\) と \(y\) は同一の集合であるということです．

## 空集合を表す論理式

以下の記述を簡潔にするために「集合\(x\)が空集合である」ということを表す論理式\({\rm{emp}}(x)\)を定義しましょう．

感覚的には\(x\) が空集合であれば，どのような元も\(x\)には属さないのですから，次のように書くことができます．

::: info \({\rm{emp}}(x)\)の定義
\begin{align*}
  \forall z (z \not \in x)
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

となり，矛盾記号\(\bot\) が導けました．

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

## 空集合の一意性証明

**外延性公理**を用いて，\({\rm{emp}}(y)\) を満たす集合 \(y\) が，実は一つしか存在しないことを見ましょう．

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

- 空集合の存在は**集合の存在公理**，**内包公理図式**から導けます．
- 空集合の一意性は**外延性公理**から導けます．
- 空集合は集合の世界に存在する一つの集合です．
- 空集合は「集合ではないもの」や「なんだかよくわからないもの」ではありません．

この記事があなたの空集合に対する理解の助けになれば幸いです．

## 参考
- [キューネン数学基礎論講義](https://www.nippyo.co.jp/shop/book/7176.html)