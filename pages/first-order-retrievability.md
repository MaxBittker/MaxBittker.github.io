---
title: First Order Retrievability with Hammerspoon
---

> "I like to work fast. I despise not having the right tool or, worse, knowing I have it but not being able to find it. It’s a pointless delay that wrecks my pace—and mood." ^[[*Inside Adam Savage’s Toolbox*](https://www.wired.com/2012/08/inside-adam-savages-toolbox/) by Adam Savage]

![Spice Rack](https://s-media-cache-ak0.pinimg.com/originals/57/4c/34/574c34191435887722f0a4ad0868d75c.jpg)

"First Order Retrievability" is the idea that the tools you use most should be directly accessible from your workspace, and able to be used without opening drawers, unzipping bags, or fuddling with your desktop manager. 

One aspect of using computers that I don't enjoy is the feeling of fumbling through many windows to find the information or tool you need. I think that people commonly use ⌘+tab or alt+tab to cycle through their windows, which is better than using a mouse, but still results in an unconscious overhead many times per day, often at the moment you're moving from one thought to another and most susceptible to distraction.

A very clean solution is to set up "absolute" hotkeys that will always bring you to the window you need, versus the "relative" navigation of tabbing or of window management systems. I think this pattern is less popular than it should be, because of how well suited it is to clean navigation between the half-dozen tools you use most often.

For me, that means using Hammerspoon (a lua API for Mac OS) to make a single set of hotkeys.

Relevant section of my hammerspoon script:
```lua
super = {"ctrl", "shift"}

windowHistory = hs.window.focusedWindow()

function toggleWindowFocus(windowName)
    return function()
        window = hs.window.filter.new(windowName):getWindows()[1]
        if hs.window.focusedWindow() == window then
            window = windowHistory
        end

        windowHistory = hs.window.focusedWindow()
        hs.mouse.setAbsolutePosition(window:frame().center)
        window:focus()
    end
end

hs.hotkey.bind(super, "q", toggleWindowFocus("iTerm2"))
hs.hotkey.bind(super, "w", toggleWindowFocus("Code"))
hs.hotkey.bind(super, "e", toggleWindowFocus("Google Chrome"))
hs.hotkey.bind(super, "r", toggleWindowFocus("Slack"))
hs.hotkey.bind(super, "a", toggleWindowFocus("Messages"))
hs.hotkey.bind(super, "s", toggleWindowFocus("Spotify"))
```

I like Hammerspoon because scripts you write against APIs easier to adapt to your exact workflow needs than the configuration of a limited set of features like you get from system settings or most window management software.

One downside to these kind of custom keybindings is the risk of colliding with other application or OS hotkeys. A popular solution is to define super to be {'ctrl', 'cmd, 'shift'}, and then define a rarely used key such as capslock to emulate pressing all three of those keys, effectivly giving you another modifier key.
