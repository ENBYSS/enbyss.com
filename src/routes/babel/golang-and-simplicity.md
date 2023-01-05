---
title: Golang and Simplicity
description: A come-around from someone who used to hate Go.
category: articles
image:
    src: 'golang-and-simplicity.webp'
    alt: 'Revisiting Golang'
createdAt: 2022-08-30
updatedAt: 2022-09-22
---

**Update 2022-09-22:** Here you will see me _compliment_ Go. Infact, I call it _pretty alright_. Objectively - I do believe it is. Subjectively however, my opinions have shifted wildly and I'll be doing a writeup about all my grievances. In the meantime, I'll tell you that the straw which broke the camel's back was trying to release a **major** version upgrade. Needless to say, I've been burnt bad. Anyways, back to the article.

---

If you've ever heard me talk about _Go_, it was probably in a bad light.

Let me spoil it right off the bat. I still have problems and grievances, but the language is actually pretty alright.

Yeah, it's not a secret that I hated working with the language. Didn't help that my introduction to it was through work, and was the winning alternative to a favourite language of mine - Rust. That started us off on a bitter foot. Maybe I'll talk about Rust one day - I'm no evangelist but I'd still call it one of my favourite languages out of the lot.

**Go**, I feel, is a language that can cause quite a lot of friction. It can also be pretty polarizing. Reasoning isn't some deep quality issues, but because of a strongly opinionated design and system that kind of locks your capabilities. This is not strictly _negative_ - said system results in a significant **pro** infact - _simplicity._

## A quick tour

The language is one of the simplest to deal and work with. With regards to simple languages, I'd say it wins the contest for my favourite hands down. _Python_ and _Ruby_ are cool - however I'm someone who'll never really like _dynamic typing._ It can make writing code simpler, but more often than not what it does is just cause _numerous_ bugs that would've been avoidable in a _static typed_ system. Not to mention, of course, the **worse autocomplete**.

This is why if someone asked me to recommend a language to start with, I'd say _Golang._ It's simple, easy to setup and play with, and implements some pretty important concepts quite well. To prove this, how about I show an example?

```go
type Dog struct {
    Name string
}

type Cat struct {
    Name string
}
```

Here's some `structs`. A `struct` is short for `structure` - and it encapsulates a group of data. So `Dog` here has a `Name`, and so does `Cat`. if I want to create a dog named `Fido`, that could be done like so:

```go
fido := Dog {
    Name: "Fido"
}
```

Now, let's say I want to be able to _call_ a dog home. In our case, we do this by printing whatever we'd want to say on the _terminal_ - which is where the code is run.

```go
fmt.Println("Come home, " + fido.Name)
```

This is fine, but it can get tedious to type all this out whenever we just want to call `fido` home. So, instead we can define a **method:**

```go
func (dog *Dog) CallHome() {
    fmt.Println("Come home, " + dog.Name)
}

fido.CallHome()
```

Now we can just use `CallHome`! Infact, we might want to do the same for cats:

```go
func (cat *Cat) CallHome() {
    fmt.Println("Come home, " + cat.Name)
}
```

I know this is getting long, but there's one more thing to show. 

Now, say there's someone who's got a lot of pets - both cats and dogs. You wanna represent them in the code, so you use a struct right?

```go
type Person struct {
    Name string
    Cats []Cat
    Dogs []Dog
}
```

..and if this person wants to call all of their pets home - the best thing to use would be a method...

```go
func (person *Person) CallPetsHome() {
    for _, cat := range person.Cats {
        cat.CallHome()
    }
    for _, dog := range person.Dogs {
        dog.CallHome()
    }
}
```

## Static vs. Dynamic Typing

I want to pause here - because this is a good point for comparing _static typing_ and _dynamic typing_. Go is _statically-typed_, like I said - and here you can see that we have to declare what type things are. In this case, we're storing cats _and_ dogs - but a cleaner way would be to just have _pets_, and in dynamically typed languages this is easy. Here's an example in python:

```py 
class Person:
    def __init__(self, name, pets):
        self.name = name
        self.pets = pets

    def call_pets_home(self):
        for pet in self.pets:
            pet.call_home()

person = Person("Enbyss", [Dog("Fido"), Cat("Skimbleshanks")])
person.call_pets_home()
```

You can see that we don't need to separate these two, the code just works as is. This is a pro of _dynamic typing_, it's very easy to prototype things and go fast. However, this comes at a pretty steep negative in my opinion, in addition to a smaller one. See, what if I defined a person as this?

```py
person = Person("Enbyss", Dog("Fido"))
```

Well, the editor won't complain. It will see nothing wrong here. You might have even missed the problem - but when this code is run, what's returned is this:

```
Traceback (most recent call last):
File "<string>", line 26, in <module>
File "<string>", line 21, in call_pets_home
TypeError: 'Dog' object is not iterable
```

I emphasize - when this code is _run_. Code isn't constantly being run - and people can easily see that there's no problems reported by the IDE and go, yeah things are good. The example above is very obvious and simple - however this problem becomes _significantly worse_ when you're dealing with large codebases that have nested logic and use external libraries. **Suddenly**, while you may think things are fine, when you run the code there could be some error about iterability - and it would be _pretty hard_ to find out the problem.

Hell, what if you have something like this?

```py
def do_thing(obj):
    do_this(obj)
    do_that(obj)
```

What is `obj`? What type do I need to pass here? Well, I need to go through the documentation or trudge through code to find out - and this confusion can end up complicating the learning process.

I'm not done - there's a second issue infact. do you remember this method?

```py
def call_pets_home(self):
    for pet in self.pets:
        pet.call_home()
```

You lose all autocomplete functionality here. What's autocomplete? In a nutshell, it's when you type something like `pet.` and the editor shows you examples of what could follow - for example a `Pet` has `call_home()`, so the autocomplete window will show `call_home()` as an option.

Here's the problem - how is the editor supposed to know that `self.pets` is a _list of pets?_ There only reason _we_ know is because we designed the function - but if someone else looked at `Person`, they could easily wonder what `pets` is supposed to be set as. The answer here is that _there isn't a type_. You just need to pass something that has a `call_home()` function.

::Note
This is called _duck typing_, so called because of the following phrase: <br/> <br/>

<span class='block text-center'>_"If it acts like a duck, and quacks like a duck, then it's a duck."_</span> <br />

Compared to static languages, where you know what something is because it's defined - dynamic languages can't use this information because it doesn't exist. Instead of saying _"this function accepts a Duck"_, the only thing you can say is _"this function accepts something that quacks"_ - with no way to specify this in the actual function _signature_ (aka `def call_pets_home(self)` - the name, parameters, and in some cases - return value)
::

### Interfaces

So that's all fine and dandy Enbyss, great that you hate dynamic typing or whatever, but so what? The code ends up looking cleaner - I don't need to do this splitting into `[]Cat` and `[]Dog`. _Well_, that's where I have to stop you. See, you won't need to do that in statically typed languages either.

```go
type Person struct {
    Name string
    Pets []Pet
}

type Pet interface {
    CallHome()
}

func (person *Person) CallPetsHome() {
    for _, pet := range person.Pets {
        pet.CallHome()
    }
}
```

Say hello to _interfaces_. They're a special type that serve as an _abstraction_. There's no logic inherent to an interface, but instead it represents _anything that can `CallHome()`_. In most other languages you need to implement this explicitly - so for example in rust...

```rust
trait Pet {
    fn call_home(&self);
}

impl Pet for Cat {
    fn call_home(&self) {
        println!("Come home, {}", self.name);
    }
}
```

In _go_ however, this happens _automatically_. For beginners, this serves as a seamless way to learn interfaces and their utility - for professionals, this is still pretty cool because you can now define interfaces that _external types represent._ Of course this is also possible in Rust, but that's a story for another time.

With all this, I've shown interfaces, structs, methods, variables, and types - pretty quickly compared to other languages. I love **Rust**, but that language is stuck at hard mode. In a way, it feels like Golang and Rust _complement each other._ They're both pretty cool and unique languages, but one strives for simplicity and uniformity, and the other goes for power and potential.

## Higher Order Functions

That sounds pretty scary. Like one of those things you'd get taught in courses. Just as a thought experiment - I've shown you methods and types now, right? Look at this code, and try to understand what it's doing.

```go
func HelloWorld() {
    fmt.Println("Hello world!")
}

func DoTwice(function func ()) {
    function()
    function()
}

DoTwice(HelloWorld)
```

No shame in being confused - what this code does is run `HelloWorld()` twice. We're passing the function into `DoTwice`, and then `DoTwice` well... calls it twice. If you're not confused, and you're not too familiar with code, that's the power of **Go.** In static languages, doing something like this can be a pain in the ass. Dynamic languages of course get it for free:

```py
def hello_world():
    print("Hello world!")

def do_twice(fn):
    fn()
    fn()

do_twice(hello_world)
```

This is why dynamic typing isn't _terrible_, things like this come easily - however the same problems still apply, you know nothing about `fn`, it might require a parameter or return a type - or better yet I could just do this.

```py
do_twice(2 + 2)
```

```
Traceback (most recent call last):
  File "<string>", line 5, in <module>
File "<string>", line 2, in do_twice
TypeError: 'int' object is not callable
```

Golang gives you this functionality _easily_ - the type is easy to define, and once it is, you can just pass in the function no problem. Plus, static typing means you know _exactly_ what the function _needs_ and what it will _return_ - and any mismatching function will show you an error in the editor _immediately_ without needing to run.

## Generics

One last thing. What if, say, you wanted to sort a list? We won't get into logic here - but what would such a function _look like?_ In python, it's easy.

```py
def sort_list(unsorted)
```

In the function you'd then just add logic to sort the list. If the elements can't compare, you're outta luck - but ignoring that, it feels simple and clean. However, we'll run into a problem when it comes to statically typed languages...

```go
func SortList(list ?[]) ?[]
```

What do we set the type of the parameter and output to? Well, you could set individual types like `int64`, but then you'd end up with a million functions all doing the same thing on different types. This is where _Generics_ come in. 

```go
func SortList[T any](list T[]) T[] 
```

so `list` is ` T[]`...? What's that? Well, `T` is a _generic_ - and as we're seeing in `[T any]`, it can be any type. Suddenly, our `SortList` function works with every single type of list that we can pass in - or it would if it compiled. _Remember_, not every type can be compared like that. Like, what if I passed a custom `struct` of mine, say `Cat`? So, instead of any...

```go
func SortList[T comparable](list T[]) T[]
```

...we use `comparable`, which means _anything that can be compared with their own type._ For example, a `number` is comparable because I can do `2 > 5`. `Cat` isn't because I can't do `myCat > yourCat`. 

Like this, one function can be used generically, but at the same time if you pass in stuff that isn't supported, you'll get an error showin up in your editor or at compile time.

## End

I know I hated on _dynamic typed languages_... and yeah I don't like them - but at the same time they do have at least one pro, being that some things come really easy. Instead of needing to futz around types, classes, interfaces, generics, whatever - you can just let the language handle all of that for you. Certain projects really benefit from that - small ones, prototypes, and AI all use this dynamic nature to their advantage, since rather than focusing on defining stuff you can simply define _logic_ instead.

But as I've grown, I learned that _static typing_ has helped me a lot. It's tougher to learn, and by definition can be more strict which feels limiting - but the limits are well worth it, and they're there for a reason. Golang, to me, feels like _the_ language that meshes the simplicity of python with the utility of static typing. You can learn it quickly, and stuff can be done quickly as well. I didn't even go into how easy it makes stuff like concurrency - though to be fair I haven't played with that myself. 

I remember when I hated the limits Golang set up - but similarly to static typing, they serve a purpose. Code is standardized, looking similar which means that it can be easy to look at other Go code for the first time and understand what's happening. This standard is then set to the goal of _simplicity_ so that people can get into it easily - and I think they did a great job. Although pointers are still a thing which uh... They're a lot. Maybe I'll write on them too. 

In the end, _Golang_ is very opinionated - and its opinions tend to clash with my own. But I respect its approach, because it has undoubtedly led to many people picking up programming, learning, and going deeper into the field. Its ease of use, combined with ease of debugging and a dash of power, has left it a damn good language to pick up and use for whatever project you want to use. 

Of course... if you ever fall deep into the rabbithole and start to get a taste for power and bloodshed - when the surface of the ocean proves too calm for your needs - when you wish to fall into the chasm, deep into the trenches, destined to meet whatever is at the centre of the earth... then, I'll be waiting in the water, with a crab in my hands.

And I'll tell you about **Rust.**

<p class="text-center text-2xl font-bold"> To be continued...? </p>