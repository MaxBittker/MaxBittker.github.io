---
title: Making Sandspiel (wip dont share pls)
path: making-sandspiel
date: 2019-01-06 00:00:00
---

[Sandspiel](https://sandspiel.club) is a falling sand game I built in the fall of 2018.

If you haven't played a falling sand game before, imagine a pixelated chemistry kit. You're given a palette of virtual solids, liquids, and gasses, and it's up to you to paint them onto the screen and discover how they interact.

![screenshot](https://raw.githubusercontent.com/MaxBittker/sandspiel/master/Screenshot.png)

## Why I love falling sand games 2/3

I think I loved these games so much because their mode of play was creative and scientific in a way that activated my imagination. Playing with the elements means asking questions, building experiments, and inventing your own play.

> "What does fungus do?"

> "Let's make the coolest volcano!"

> "Does anything destroy lava?"

> "What happens if I do _this_?"

The behavior of any single element is quite simple, but the resulting system is so rich for exploration because of the many ways which elements can interact in different combinations and configurations.

The resulting interactions are engaging not only for their complexity, but because of the ways your imagination sees reality reflected in them. Pouring some yellow pixels onto green ones can invoke a vivid scene in your mind far more engaging than what happens on the screen.

> "Low-fidelity art is also appealingly open to interpretation. If a character is only eight pixels tall, a large part of what we see is within our own imagination." - Loren Schmidt

### Microcommunity 2/3

People love to opine on their forgotten, weird corners of the internet, and mine is the upload gallery of dan-ball.jp's Powder Game around 2007-2013. There was a beautiful micro-culture of people making games, toys, science demonstrations, propaganda, and art for one another to download and enjoy.

Powder Game's upload galleries were beautiful place because the venue to build something and share it led to people inspiring eachother, riffing, showing off, and pushing the game in incredible directions! Sand games had so much staying power in my childhood in large part because of this weird community.

It's also important that this system was built right into the game -- every player had a immediate audience for their creation, versus a culture of a few famous youtubers or streamers. There was a wide variety of complexity and motivations among posters. Best of all, no comment section!

Three archetypes of upload I remember fondly:

Games for the player, often with empty promises of some reward for voting.
![mood ring](moodring.png)

"Don't Smoke" educational demonstrations. (I think these were directly fueled by children coming home after D.A.R.E. programs at school)
![dont smoke](dontsmoke3.png)

Cool volcanos.
![volcano](volcano.png)

Beautiful pixel-art architecture to destroy.
![castle](castle.png)

The creativity and imagination here were something I wanted to facilitate in sandspiel.

## Building Sandspiel 1/3

Sandspiel was (at least) my third go at building an interactive falling sand simulation.

![dust](dust2.png)

[My early attempt](https://maxbittker.github.io/dust/) was pure javascript in 2015. It was slow, used canvas APIs, and had a dissorganized mess of dynamic typing, switch statements, and global variables which made implementing and debugging each successive element's logic increasingly difficult, to the point that it even resulted in interesting bugs that I kept in the game, such as the "gitch" element. I was really proud of this game and had a great time building it, but it followed the familar arc of a system collapsing under its own weight as improving or refactoring became more difficult and motivation waned.

![lua](lua.png)

The [second approach](https://github.com/MaxBittker/sand-toy) was in lua, and it evolved into my work on Sandspiel. A few things are briefly worth saying on this experience.
First I want to say that luajit is super fast, and [LÖVE](https://love2d.org/) is an excellent tool for building games.
Shaders, input handling, update and render loops -- pretty much everything clicked together and made life easy so I could get the game running quickly with minimal yak shaving and boilerplate.
Coming from the browser, a tool which I have personally sunk _hundreds_ of hours into learning APIs, edge cases, and optimizitions, it was a shock to see how simple and effective an intentional programming environment for building games could be.

Another important aspect of this attempt was that I was coming into it with several years of experience beyond what I had when building the pure javascript game. I also had an important new goal - not only did I want the game to be fun to play, but I also wanted elements to be fun to _write_.

I was focusing on the ergonomics of defining elements with code because I was imagining a sand game with a sandboxed programming interface that would allow people to not only share their compositions, like in the old games I loved, but also to code their own new elements and share those!

The first step of this process was still building a set of elements on my own, but I was thinking carefully about the needs of the element authors and designing the engine to move as much complexity away from being the responsibility of the individual elements.
Everywhere that I could while designing the system, I tried to make the definition of a new element as simple and self-contained as possible, even when it meant just moving that complexity to into the "engine".

```lua
function updateGas(p, getNeighbor, setNeighbor)
    local d = {x = math.random(-1, 1), y = math.random(-1, 1)}
    if (getNeighbor(d) == 0) then
        setNeighbor({x = 0, y = 0}, 0)
        setNeighbor(d, p)
    end
end
```

This meant defining a contract that elements had to follow -- they're a single update method which will be called once per dot per frame by the system, and they can interact with the system only via special methods which allow safe reading and writing to their neighbors while abstracting away concerns such as the absolute position of the element in question (setNeightbor and getNeighbor deal in relative offsets), observing limitations such as how far away an element is allowed to mutate or inspect other elements from (in this case, only their direct neighbors, no "action at a distance"), or handling out of bounds accessses. This work meant relieving the individual elements from needing to take these concerns into their own logic, and making the system more consistent, and critically faster and more fun to experiment with as I implemented my set of elements.

Utimately, I was excited about this approach, but wanted to build in a an enviroment that would be easy to share. Despite everything good I had to say about LÖVE, the web is too special of a platform to pass up for me, and it's worth the difficulties imposed by its quirks and warts.

I decided to put down the lua sand game and switch to rust and web assembly, but I was able to translate many of the lessons and patterns over. Having a good idea of what my datastructures would be and what types of APIS would be defined between components made writing the rust version easier.

Implementing one idea multiple times was a huge strength in my ability to make better tradeoffs, structure my codebase, and forsee pitfalls. I would strongly recommend this experience to anyone - If you have a project that you've attempted in the past but had to make compromises on due to your technical skills or endurance, taking another crack at it can a great opportunity to sweat the details and focus on aspects that you usually don't.

### Architecture: 2/3

The bulk of the simulation, including the movement and interactions of all of the elements, takes place in Rust in a class called Universe. This is class handles the simulatoin and exposes a set of methods that get called by the javascript application, to do things like process a single tick or paint some pixels in response to an input event.

This means that I don't try to handle an event loop or interact with the browser from inside the rust code - This is perfectly possible, but I chose to

Data format

```rust
#[repr(C)]
pub struct Cell {
    species: Species,
    ra: u8,
    rb: u8,
    clock: u8,
}
```

```rust
#[wasm_bindgen]
#[repr(u8)]
pub enum Species {
    Empty = 0,
    Wall = 1,
    Sand = 2,
    Water = 3,
    ...
    Seed = 19,
}
```

`ra` and `rb` are two 8 bit registers for extra cell state. They're used in different ways by different element species! They only differ in that ra is initialized to a random value, and rb is initialized to 0. Register A is also used in rendering to determine how light the pixel should be, which is where the slight visual noise comes from.

`clock` is used to avoid a single logical cell from being simulated multiple times in a single tick if it moves in the same direction as the update scans. Because I run simulate cells one at a time from left to right and top to bottom, if something is moving down, it will keep bumping itself ahead of the "scan line" and can move many spaces in a single frame. Clock is meant to keep track of what elements have been simulated already - it could be a single bit that I flip back and forth but it's important that my Cell type is represented by a total of 32 bits!

Update Function

```rust
// Called once per sand particle:
pub fn update_sand(cell: Cell, mut api: SandApi) {
    let dx = rand_dir(); // random value in {-1, 0, 1}
    let neighbor = api.get(0, 1); // get the Cell Struct of the cell below me

    if neighbor.species == Species::Empty { // try to fall down
      api.set(0, 0, EMPTY_CELL); // erase myself
      api.set(0, 1, cell); // write myself one cell lower

    } else if api.get(dx, 1).species == Species::Empty { // try to fall diagonally
      api.set(0, 0, EMPTY_CELL); // erase myself
      api.set(dx, 1, cell);  // write myself down and to the side

    } else if neighbor.species == Species::Water // try to sink through a lighter element
        || neighbor.species == Species::Gas
        || neighbor.species == Species::Oil
        || neighbor.species == Species::Acid
    {
      api.set(0, 0, neighbor); // swap places
      api.set(0, 1, cell);
    }
}
```

SandApi a struct that encodes the location of the element in a way that is transparent to the update function. It has two important functions: get and set, that accept relative coordinates and let you read and write to your neighboring cells. For instance, `api.get(0, 1).species` tells you the species of the particle below you, and

```rust
api.set(1, 0,
   Cell {
      species: Species::Fire,
      ra: (150 + (cell.ra / 10)) as u8,
      rb: 0,
      clock: 0,
    }
  );
```

### Rendering

To move the game state from Web Assembly to WebGL, we create a [Javascript typed array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Typed_arrays) view of the web assembly memory, and pass that to our fragment shader (GPU code) via a texture.

```javascript
// Typed Array is not a copy, it's a view of our web assembly array
const cellsData = new Uint8Array(
  memory.buffer,
  universe.cells(), <- // a pointer to the Cell array in WASM
  width * height * 4
);

gl.bindTexture(gl.TEXTURE_2D, cellTexture);
gl.texImage2D(
  gl.TEXTURE_2D, 0, gl.RGBA,
  width, height, 0, gl.RGBA, gl.UNSIGNED_BYTE,
  cellsData
);
```

By storing our game state data in a way that happens to be a valid image texture, we can
ship the whole thing over to the GPU with minimal repackaging and allocation! This was a big deal for making sandspiel's rendering performance so good- our rendering code blocks the CPU for less than 1 millisecond\* (Critical for meeting the strict 16ms budget to achieve 60FPS)

This trick is also is why it was so important that our Cell state was stored as an array of 4 byte chunks. WebGL has a lot of restrictions on the formats of data that can be used in textures, particularly on phones or older devices.

![sand-trace](sand-trace.png)

for the “logic” code in species.rs that defines how elements behave, i felt able to do whatever I wanted, including lots of branching, some higher order functions, abstractions, casting type of numbers, etc. (but, definitely very little heap allocation). This is notable because language expressiveness here indirectly impacts how fun the game is, but this code is also super hot and runs thousands of times per frame.

an interesting anecdote here is that I unwittingly wrote most of the game with my rustc optimization strategy on “z”, optimize for binary size. once the project was already quite developed I realized this and switched it to o3 which things like inlining and gave me a big performance boost, where i had been being frugal!

### Fluid Dynamics 2/3

Sandspiel's fluid simulation is ripped from [Pavel Dobryakov's WebGL Navier-Stokes implementation](https://github.com/PavelDoGreat/WebGL-Fluid-Simulation). I'm extremely grateful for such a high quality open codebase to learn from, and in fact adapting this code was the most personally challenging technical hurdle I faced building the game.

Adapting the code was difficult because, in order to have interactions between the wind (simulated on the GPU) and the particles (simulated on the CPU), I needed to pass data from Web Assembly to WebGL, and vice versa.

I also needed to do this in a way that only used webgl features available on phones - WebGl is a pretty complicated spec, and for hardware and driver reasons, not all of it is available on all devices.

The texture types they support (the fluid sim is in floats, but on phone browsers I could only take data in or out of the shaders via unsigned byte textures, required some munging)

There’s also a maximum # of bound texture units of 8, and I had to plug a lot of gaps in my knowledge of how OpenGL works in order to correctly bind textures for each program and stay under that limit.

All of this was made worse by the fact that my only phone to test code on runs iOS, and Apple only allows you to connect to the mobile safari devtools from a mac. So I was debugging many of these WebGL device-specific limitations without so much as a console. Very frustrating and developer-hostile restriction placed by Apple here.

### User Interface 2/3

I threw the interface together mostly in React. If you have one takeaway from this project, I want it to be that Web Assembly is not an all or nothing undertaking! The ability to put low-level and performance-critical logic into Rust and then handle browser stuff, glue code, and a high-quality UI in JS was critical to this project working out.

Leveraging the npm ecosystem for tools like React, Regl, and GLSLify, as well as exercizing Javascript's flexibility to throw data anywhere I needed it without planning or refactoring in order to validate ideas enabled me to go a lot further.

Nothing I wrote in JS would have been _impossible_ to accomplish in rust, but it wouldn't have come together as quickly and I wouldn't have been able to test as many ideas along the way.

That being said, building high quality interfaces is something I value and respect, but I feel that I mostly phoned it in for this part of the codebase and the experience suffers for it. There are still a bunch of absent small touches like loading indicators, proper routing, visual feedback on buttons, pagination, etc. I was really itching to release the game and didn't budget the time to do a better job.

### Sharing & Persistance 1/3

Knowing that I wanted some sort of social sharing functionality, I decided to try using Firebase to handle my backend needs.
I think it worked out really well! One design decision that turned out to be important here was that I wanted to avoid dealing with accounts and authorization. I find that stuff annoying for the user and boring to implement so I went to some lengths to do without it.

The way that I handled data security without auth was putting all data writing inside of cloud function endpoints, and using these to constrain what the client could do. (basically, insert and vote only, no editing or deleting of other posts). My workaround for voting deduplication was to use IP addresses, which is possible to manipulate, but I don't really care enought to try to fight it.

A cool thing here about the backend is that I serialize the game state as a PNG, which is compact and very compressbile. Plus, browsers have PNG encoders and decoders built in, so that's more code I don't need to import and ship with my bundle.
Here's what one looks like:
![data](data.png)

The basic architecture is something like this:
![firebase](firebase.png)

Firebase cloud functions worked really well to handle demand (average 2 requests per second on the peak day)

There were times when I was really just wished I was writing a http server with a redis instance and dumping the files into a directory. But I don't want to be on the hook for DDos, failovers, upgrading dependencies - especially when the other things running on my VPS are already fragile, stateful, and ad-hoc. Firebase was harder to debug but I don't have to think about it now that the service is deployed, and it's cheap enough and reliable. Running the game for a month (including the initial spike of traffic) has code about \$30 of my free credits, and I expect that at the current rate of traffic, it will be sustainable for me to keep running for the forseable future.

### Community so far: 0/3

SparkyKat
Belp
glitch liquid
js api

Thanks for reading!

#Resources to check out:
[The Book of Shaders](https://thebookofshaders.com/) I didn't specifically reference during this project, but I take any opportunity I can get to recommend the book of shaders to people interested in graphics programming.

[WebGL Fundementals](https://webglfundamentals.org/) & [WebGL2 Fundementals](https://webgl2fundamentals.org/) Really solid & complete explanations of WebGL basics, put into context of common tasks and patterns. Finding those two things together is rare!

[The Rust Wasm Book](https://rustwasm.github.io/book/) is a _great_ succinct resource that covers all aspects of writing a hybrid JS & Rust application. I had basic rust knowledge before starting Sandspiel, but no knowledge of web assembly, and was able to follow this book to bootstrap the game. A lot of code from the book actually ended ended up in my game, since their example was cellular automota related.

Also, thanks to Chris Crawford, Nikhilesh Sigatapu, Thais Correia, Pavel Dobryakov, the Rust WebAssembly working group, and ha55ii for inspiration, knowledge, code, and feedback!
