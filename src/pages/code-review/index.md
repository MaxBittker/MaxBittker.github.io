---
title: How to Review Code You Don't Understand
date: 2018-01-05 00:00:00
path: code-review
---

![Rubber Stamp ](./lgtm.jpg)

Code reviews are an important part of bringing people's minds together to build working software. Not only do they allow one person's experience and perspective to augment another's blind spots, but they also aide in sharing information and building a more robust web of institutional knowledge.

Because of their importance and the difficulty in getting them right, much has been said about best practices for conducting code reviews. Some common advice is to take your time, not get caught up on style distinctions, ask lots of questions, break code into digestible chunks, and be empathetic to the author of the code being reviewed.

This advice (as well as following the example set by my peers) has helped me out a lot! Most of the time I feel pretty good about giving and receiving code review. However, there's still a situation that comes up frequently enough that it causes me a good amount of doubt and stress - reviewing code that I don't understand.

On one level, there are obvious answers to this problem. Code reviews are the perfect opportunity to ask questions, do deep dives into surrounding code, look at documentation, and work towards understand confusing code. And if you're in a situation where taking the time to do this well isn't worthwhile for your own knowledge or for the benefits to the reviewee, then there might be someone else who would be a better fit to provide the review.

Sometimes the reality of the situation is a bit messier than that. Perhaps the code being touched is an obscure corner of the codebase only maintained by a small group of people. The behavior in question might involve subtle distinctions and edge cases which require an understanding of the system you don't have. Maybe you have a lot of trust of the author's understanding, and it's a fix that needs to go out as soon as possible. In an ideal world, it would be valuable to learn enough to confidently review the code on even footing, but it may not be the best use of your time in every situation.

This situation has been daunting to me in the past, but there are a few strategies that I try to use now to help me provide _useful_ and timely review in situations where I don't exactly know what's going on.

### Reduce risk

Think about the scope of the diff, and hone in on the places that pose the highest risk to the wellbeing of your application and codebase. You may not be able to grok the entire changeset, but if you focus on the places that mutate important data, touch a critical path, or have had tricky bugs in the past, you may be able to use your energy more efficiently to double-check logic and help ship code that works, or at least breaks non-destructively. Code reviews are also a great place to discuss deployment plans and possible fallbacks.

> "The data migration looks solid! Wasn't able to understand everything going on in the UI. Let's ship it monday and probably run it on staging first to be sure there are no orphaned models."

### Focus on the tests

Tests can be a great entry point to understanding a confusing changeset. They give you basic context for the assumptions of author, and if you think that the breadth and behavior of the tests is good, that can be enough to give you confidence in the code when you don't understand every intermediary step.

> "Don't exactly understand the situation where this bug was coming up, but looks like you wrote good tests. Do you think it would be helpful to have one for cases where the relationship doesn't exist?"

### State assumptions

If you're not sure what direct questions to ask to understand the code better, try leaving comments as you work through the diff, expressing your tentative understanding of what's going on. It's helpful for your own comprehension, and if you're wrong about an assumption in the system, that could be the key piece of information an author can provide you with to speed things along. These comments also help the author see the code from the perspective someone reading it in the future, which could lead to a different approach or to better variable names, comments, and documentation. Remember to also leave comments about the parts you weren't able to parse! Being honest about what you don't understand is a useful signal in itself.

> "Not sure what the difference between these two inputs are, but they would always be linked to the same user object, right?"

### Review at the level you do understand

Perhaps the implementation is over your head. You're still able to manually verify the behavior in your development environment, and it feels good and matches your expectations as a user. This isn't the same as providing feedback on the architecture or identifying subtle bugs, but it does help a lot more than a rubber stamp.
Or maybe, the desired behavior is mysterious and domain-specific, but you can still read the code for its own intrinsic properties, and look for "classic" bugs. Complicated break conditions? Accidental mutations? Tricky standard library functions? Off by one errors? Null checking? String parsing with loosely defined inputs? ... String parsing in general? All of these things can provide value, even when you're reviewing code that does some kind of Gregorian space math you've never heard of.

> "I'm not totally sure that splice is doing what you want here, especially when the input is negative"

### Let's talk about this more!

These approaches have helped me to both feel better about reviewing code I can't wrap my head around, and to provide more helpful feedback than a rubber stamp and a division of guilt to my team-members. It's still a skill that I'm working on, and I would love to hear other people's perspectives and approaches to the situation, because I think that it's a pretty common dilemma!

<hr>

Thanks to Thais Laney and Veit Heller for suggestions and edits.

Image credit: [rachelbythebay](https://rachelbythebay.com/w/2012/03/10/review/)
