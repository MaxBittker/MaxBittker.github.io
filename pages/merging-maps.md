---
title: Merging Maps
---

> "If I were going to give you a quick summary of what our codebase is like, I’d say it’s procedural code that manipulates maps." ^[[*Fourteen Months with Clojure*](https://blog.skyliner.io/fourteen-months-with-clojure-beb8b3e4bf00) by Dan McKinley]

Maps or *"Associative arrays"* are a ubiquitous abstraction in software development. They allow us to flexibly model data in a form that lends itself to manipulation, inspection, and portability.

 If you're looking, you'll see maps everywhere -- in databases, file systems, serialization formats, object oriented programming languages, and most likely, all over your codebase.

...Except you may not call them "maps" --- key value data structures inexplicably have a different name in every single programming language:

```
{
  Python: "Dictionary",
  Javascript: "Object",
  Lua: "Table",
  PHP: "Associative Array",
  Ruby: "Hash",
  Java: "HashMap",
  Clojure: "Map",
  Go: "... also Map."
}
```
It's not just the names. I've found the tradeoffs and ergonomics provided around maps to be a significant point of asymmetry between languages. The idea behind this post is to compare languages "fluency" in map processing through a common operation: merging multiple maps into one.

## Merging Maps?
Merge is not a primitive operation on key value data structures in the same way that get, set, or enumeration are. That being said, building the union of two maps is unavoidable from mathematical and practical perspectives. So - what does it mean to me to have first class support for merging maps? Ideally, I'd like to see a single method that's:


Composable

: Can you use it as an expression and nest it with other expressions?

variadic

: Can it merge more than two maps in a single invocation?

Extensible

: Can you customize the value resolution strategy for key collisions?

Preserving

: Does it mutate the original map, or return a new one?


You might read this analysis and feel that it's meaningless to judge the quality of built-in merge functions, when any sort of merge functionality could be 'trivially' implemented, imported, or coaxed out of a slick one-liner from stack overflow.
This is all completely true -- but I still hope you'll find this comparison to be an interesting lens to the priorities and baseline "quality of life" of these languages.

### Javascript:

```javascript
    Object.assign(
      {shoulders: 2},
      {knees: 2},
      {toes: 10}
    )
```
**composable, variadic, and preserving**

Not Bad - slightly esoteric invocation, but it takes any number of dictionaries. The return value is the mutated first argument, but to side-step that, you can pass an empty object literal **`{}`** in the first position.

It's worth mentioning that being variadic is useful for javascript at runtime as well, because you can use the **`...`** spread operator to merge a dynamic number of objects from an array.

No way to customize merge strategies with this function, you'll need to defer to a helper library, or drop down to a `reduce` one-liner.

Worth mentioning that like everything in javascript, there's a caveat: This was part of the ECMAScript 2015 standard, and isn't available in all JS environments. ^[If you need you Object.assign to work across all browsers, you need to polyfill or import a utility library]


### Ruby:
```ruby
    mapA.merge(mapB)
    # with collision resolution block:
    mapA.merge(mapB){|key, valA, valB| valA + valB}
```
**composable, extensible and preserving**

There's also a version **`merge!`** with the same api that *does* mutate the array, which is pretty sweet. In order to merge multiple hashes, you can invoke merge with `inject` (aka reduce aka fold) like this:
```ruby
  [mapA, mapB, mapC].inject({}, :merge)
```

### Python:
```python
  dictD = {**dictA, **dictB, **dictC}
```
**composable, variadic, and preserving**

This is quite nice - but only works in python 3.5+, taking advantage of the **`**`** "splat" unpacking operator. This makes it incompatible with situations where you have a *list* of dictionaries to merge, because the same splat operator is also used for spreading lists out into function arguments, and to my knowledge you can't double splat.

You can merge dictionaries in python 2.7 like so:
```python
    dict(dictA.items() + dictB.items())
```
but be warned that *this one* doesn't work in python 3.

### PHP:
```PHP
    $arrayD = array_merge($arrayA, $arrayB, $arrayC);
```
**composable, variadic, preserving, and confusing**

PHP uses a single data structure for associative and indexed arrays, and so its standard library methods have mixed behavior depending on which kind of keys are used (strings vs numbers). In this case, `array_merge` will overwrite string key collisions with their "rightmost" occurrence, but *renumber* numeric keys, similar to an array append in other languages. There's also the union operator **`+`**:
```PHP
    $arrayC = $arrayA + $arrayB;
```
which takes the *leftmost* value in cases of string and numeric key collisions, with no renumbering ... or you could use `array_replace`, which takes the *rightmost* value like `array_merge`, but doesn't renumber numeric keys.^[Had trouble keeping the PHP merging methods straight? There's a great picture [here.](https://softonsofa.com/php-array_merge-vs-array_replace-vs-plus-aka-union/)]

PHP also includes a functionality in its standard library that none of the other languages here do: **deep** merging. `array_merge_recursive` will recursively call merge on string key collisions. When the values to be merged aren't arrays, it wraps them in arrays with the key `0`, which can then be merged -- but this means renumbering/concatenating happens instead of ending up with one value or the other. I'll only touch on one more function- `array_replace_recursive`. It operates under the same idea as its sibling `array_merge_recursive`, allowing you to merge nested arrays, but doesn't try to coerce and renumbering on collisions, so you won't find values changing type.

The way PHP blurs the line between index and associative arrays allows for some interesting merging mechanics, but there are also cognitive costs to having so many subtly different operations.
 ^[There are illustrative examples of array_replace_recursive vs array_merge_recursive [here:](https://jontai.me/blog/2011/12/array_merge_recursive-vs-array_replace_recursive/)]

### Clojure:
```clojure
    (merge {:a 1} {:a 2 :b 3} {:c 4})
    ;;=> {:a 2, :b 3, :c 4}
    (merge-with +
      {:a 1  :b 2}
      {:a 9  :b 98 :c 0})   
    ;;=> {:a 10, :b 100, :c 0}
    (merge-with vector
      {:a 1  :b 2}
      {:a 9  :b 98 :c 0})   
    ;;=>{:a [1 9], :b [2 98], :c 0}
```
**composable, variadic, extensible, and preserving**

Everything in clojure is an expression and so everything is composable - there *are* no statements. Map literals are often used as an argument syntax for functions with optional named arguments, and merge is a convenient way to override a map of defaults with a map of arguments.

Clojure functions tend to accept many arguments whenever possible, and there are a host of nice patterns like spreading, applying and destructuring to take full advantage of these variadic functions. It's a language where it's idiomatic to add a list of numbers by shoving them all into to a single **`+`** expression.

`merge-with` accepts a strategy for resolution, similar to ruby's. The difference is that ruby's block provides three arguments (key, valueA, valueB), where clojure has a simpler signature - just the values. This is actually a boon in many situations, because it means that you can skip writing an anonymous function and just make direct use of existing functions, like **`+`** and **`vector`** in the example.

There's one more hidden bonus here - clojure's maps are backed by an immutable data structure that lets us non-destructively build a new map in less than linear time and memory, by internally pointing to old values where possible. This means otherwise expensive merges can be very cheap!

### Java:
```java
    mapA.putAll(mapB);
```
**None of the above.**
Because this function is a side effect with no return value, it can't even be composed with other expressions. It's worth mentioning that Java is a world where people are likely to use other implementations of the **`Map<K,V>`** interface, like Guava's `ImmutableMap`.

### Go:
```go
    for k, v := range b {
        a[k] = v
    }
```
### Lua:
```lua
    for k, v in pairs(tableB) do
      tableA.insert(k, v)
    end
```
Go and Lua have no standard library implementations for merging their maps. Writing things out imperatively gets the job done and doesn't hide any details, but the simplicity of these languages means you give up conveniences like high level map operations. ^[Most big Go or Lua projects end up pulling in dependencies like [mergo](https://github.com/imdario/mergo) or [penlight tablex](https://stevedonovan.github.io/Penlight/api/libraries/pl.tablex.html#Merging)]

### C:
```
    ¯\_(ツ)_/¯
```
In C, there's not even a built-in concept of a map. Either make do with arrays and the fixed-layout struct, import a library, or write your own tree/hash algorithm implementation.


## Thanks for Reading!
I hope I've convinced you this was an worthwhile point of comparison. If you feel that your favorite language's honor has been irreparably damaged by my ignorance, let me know - I'll do my best to apply updates!
