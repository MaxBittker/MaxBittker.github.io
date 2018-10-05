const fShaderSource = `
precision highp float;
const float pi = 3.141592653589793238462643383;
uniform float time;
uniform vec2 mouse;
uniform vec2 resolution;
uniform sampler2D backBuffer;
uniform sampler2D channel1;
uniform sampler2D channel2;
varying vec2 uvN;

float PI = 3.14159;
float PI2 = 6.28318;

vec3 black = vec3(0.0);
vec3 white = vec3(1.0);
vec3 red = vec3(0.86,0.22,0.27);
vec3 orange = vec3(0.92,0.49,0.07);
vec3 yellow = vec3(0.91,0.89,0.26);
vec3 green = vec3(0.0,0.71,0.31);
vec3 blue = vec3(0.05,0.35,0.65);
vec3 purple = vec3(0.38,0.09,0.64);
vec3 pink = vec3(.9,0.758,0.798);
vec3 lime = vec3(0.361,0.969,0.282);
vec3 teal = vec3(0.396,0.878,0.878);
vec3 magenta = vec3(1.0, 0.189, 0.745);
vec3 brown = vec3(0.96, 0.474, 0.227);

vec2 mod289(vec2 x) { return x - floor(x * (1.0/289.0)) * 289.0; }
vec3 mod289(vec3 x) { return x - floor(x * (1.0/289.0)) * 289.0; }
vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }
vec4 permute(vec4 x){return mod(((x*34.0)+1.0)*x, 289.0);}
vec4 taylorInvSqrt(vec4 r){return 1.79284291400159 - 0.85373472095314 * r;}

const mat2 myt = mat2(.12121212,.13131313,-.13131313,.12121212);
const vec2 mys = vec2(1e4, 1e6);
vec2 rhash(vec2 uv) {
    uv *= myt;
    uv *= mys;
    return  fract(fract(uv/mys)*uv);
}
vec3 hash( vec3 p ){
    return fract(sin(vec3( dot(p,vec3(1.0,57.0,113.0)),
                           dot(p,vec3(57.0,113.0,1.0)),
                           dot(p,vec3(113.0,1.0,57.0))))*43758.5453);

}

float rand(const in float n){return fract(sin(n) * 1e4);}
float rand(const in vec2 n) { return fract(1e4 * sin(17.0 * n.x + n.y * 0.1) * (0.1 + abs(sin(n.y * 13.0 + n.x))));
}

float noise(float x) {
    float i = floor(x);
    float f = fract(x);
    float u = f * f * (3.0 - 2.0 * f);
    return mix(rand(i), rand(i + 1.0), u);
}

float noise(vec2 x) {
    vec2 i = floor(x);
    vec2 f = fract(x);

    // Four corners in 2D of a tile
    float a = rand(i);
    float b = rand(i + vec2(1.0, 0.0));
    float c = rand(i + vec2(0.0, 1.0));
    float d = rand(i + vec2(1.0, 1.0));

    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
}

float noise(vec3 x) {
    const vec3 step = vec3(110, 241, 171);

    vec3 i = floor(x);
    vec3 f = fract(x);

    float n = dot(i, step);

    vec3 u = f * f * (3.0 - 2.0 * f);
    return mix(mix(mix( rand(n + dot(step, vec3(0, 0, 0))), rand(n + dot(step, vec3(1, 0, 0))), u.x),
                   mix( rand(n + dot(step, vec3(0, 1, 0))), rand(n + dot(step, vec3(1, 1, 0))), u.x), u.y),
               mix(mix( rand(n + dot(step, vec3(0, 0, 1))), rand(n + dot(step, vec3(1, 0, 1))), u.x),
                   mix( rand(n + dot(step, vec3(0, 1, 1))), rand(n + dot(step, vec3(1, 1, 1))), u.x), u.y), u.z);
}

const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
float snoise(vec2 v){
    vec2 i  = floor(v + dot(v, C.yy));
    vec2 x0 = v -   i + dot(i, C.xx);
    vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod289(i);
    vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 )) + i.x + vec3(0.0, i1.x, 1.0 ));
    vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
    m = m*m;
    m = m*m;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
    vec3 g;
    g.x  = a0.x  * x0.x  + h.x  * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
}

const vec2  CC = vec2(1.0/6.0, 1.0/3.0) ;
const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);
float snoise(vec3 v){

  vec3 i  = floor(v + dot(v, CC.yyy) );
  vec3 x0 =   v - i + dot(i, CC.xxx) ;
  vec3 g = step(x0.yzx, x0.xyz);
  vec3 l = 1.0 - g;
  vec3 i1 = min( g.xyz, l.zxy );
  vec3 i2 = max( g.xyz, l.zxy );
  vec3 x1 = x0 - i1 + 1.0 * CC.xxx;
  vec3 x2 = x0 - i2 + 2.0 * CC.xxx;
  vec3 x3 = x0 - 1. + 3.0 * CC.xxx;
  i = mod(i, 289.0 );
  vec4 p = permute( permute( permute(
             i.z + vec4(0.0, i1.z, i2.z, 1.0 ))
           + i.y + vec4(0.0, i1.y, i2.y, 1.0 ))
           + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));
  float n_ = 1.0/7.0; // N=7
  vec3  ns = n_ * D.wyz - D.xzx;

  vec4 j = p - 49.0 * floor(p * ns.z *ns.z);  //  mod(p,N*N)

  vec4 x_ = floor(j * ns.z);
  vec4 y_ = floor(j - 7.0 * x_ );    // mod(j,N)

  vec4 x = x_ *ns.x + ns.yyyy;
  vec4 y = y_ *ns.x + ns.yyyy;
  vec4 h = 1.0 - abs(x) - abs(y);

  vec4 b0 = vec4( x.xy, y.xy );
  vec4 b1 = vec4( x.zw, y.zw );

  vec4 s0 = floor(b0)*2.0 + 1.0;
  vec4 s1 = floor(b1)*2.0 + 1.0;
  vec4 sh = -step(h, vec4(0.0));

  vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;
  vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;

  vec3 p0 = vec3(a0.xy,h.x);
  vec3 p1 = vec3(a0.zw,h.y);
  vec3 p2 = vec3(a1.xy,h.z);
  vec3 p3 = vec3(a1.zw,h.w);
  vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
  p0 *= norm.x;
  p1 *= norm.y;
  p2 *= norm.z;
  p3 *= norm.w;

  vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
  m = m * m;
  return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1),
                                dot(p2,x2), dot(p3,x3) ) );
}

float voronoi(const in vec2 point )
{
    vec2 p = floor( point );
    vec2 f = fract( point );
    float res = 0.0;
    for( int j=-1; j<=1; j++ ) {
        for( int i=-1; i<=1; i++ ) {
            vec2 b = vec2( i, j );
            vec2 r = vec2( b ) - f + rhash( p + b);
            res += 1./pow(dot(r,r),8.);
        }
    }
    return pow(1./res, 0.0625);
}

vec3 voronoi( const in vec3 x ) {
    vec3 p = floor( x );
    vec3 f = fract( x );

    float id = 0.0;
    vec2 res = vec2( 100.0 );
    for( int k=-1; k<=1; k++ ) {
        for( int j=-1; j<=1; j++ ) {
            for( int i=-1; i<=1; i++ ) {
                vec3 b = vec3( float(i), float(j), float(k) );
                vec3 r = vec3( b ) - f + hash( p + b );
                float d = dot( r, r );

                if( d < res.x ) {
                    id = dot( p+b, vec3(1.0,57.0,113.0 ) );
                    res = vec2( d, res.x );
                }
                else if( d < res.y ) {
                    res.y = d;
                }
            }
        }
    }

    return vec3( sqrt( res ), abs(id) );
}

//brownian
float fbm(float x, const in int it) {
    float v = 0.0;
    float a = 0.5;
    float shift = float(100);
    for (int i = 0; i < 32; ++i) {
        if(i<it) {
            v += a * noise(x);
            x = x * 2.0 + shift;
            a *= 0.5;
        }
    }
    return v;
}

float fbm(vec2 x, const in int it) {
    float v = 0.0;
    float a = 0.5;
    vec2 shift = vec2(100);
    // Rotate to reduce axial bias
    mat2 rot = mat2(cos(0.5), sin(0.5), -sin(0.5), cos(0.50));
    for (int i = 0; i < 32; ++i) {
        if(i<it) {
            v += a * noise(x);
            x = rot * x * 2.0 + shift;
            a *= 0.5;
        }
    }
    return v;
}

float fbm(vec3 x, const in int it) {
    float v = 0.0;
    float a = 0.5;
    vec3 shift = vec3(100);
    // Rotate to reduce axial bias
    float c = cos(0.3);
    float s = sin(0.3);
    mat3 rot = mat3(
        c, 0.0, -s,
        0.0, 1.0, 0.0,
        s, 0.0, c
    );
    for (int i = 0; i < 32; ++i) {
        if(i<it) {
            v += a * noise(x);
            x = rot * x * 2.0 + shift;
            a *= 0.5;
        }
    }
    return v;
}

//ridged multifractal
float rmf(vec2 uv, const in int it) {
    float l = 2.;
    float r = 0.;
    float a = 0.5;
    float f = 1.0;
    for(int i = 0; i < 32; i++) {
        if(i<it) {
            uv = uv.yx * l;
            float n = noise(uv);
            n = abs(fract(n-.5)-.5);
            n *= n * a;
            a = clamp(0.,1., n*2.);
            r += n*pow(f, -1.);
            f *= l;
        }
    }
    return r*2.;
}

//voronoi fbm
float vfbm(const in vec2 uv, const in int it) {
    float n = 0.;
    float a = 0.5;
    float f = 1.0;
    for(int i = 0; i < 32; i++) {
        if(i<it) {
            n += voronoi(uv*f)*a;
            f *= 2.;
            a *= .5;
        }
    }
    return n;
}

//ridged multifractal
float vrmf(vec2 uv, const in int it) {
    float l = 2.;
    float r = 0.;
    float a = 0.5;
    float f = 1.0;
    for(int i = 0; i < 32; i++) {
        if(i<it) {
            uv = uv.yx * l;
            float n = voronoi(uv);
            n = abs(fract(n-.5)-.5);
            n *= n * a;
            a = clamp(0.,1., n*2.);
            r += n*pow(f, -1.);
            f *= l;
        }
    }
    return r*2.;
}

const vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
vec3 hsv2rgb(vec3 c) {
  vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
  return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
}
vec3 rgb2hsv(vec3 c)
{
    vec4 K = vec4(0.0, -1.0 / 3.0, 2.0 / 3.0, -1.0);
    vec4 p = mix(vec4(c.bg, K.wz), vec4(c.gb, K.xy), step(c.b, c.g));
    vec4 q = mix(vec4(p.xyw, c.r), vec4(c.r, p.yzx), step(p.x, c.r));
    float d = q.x - min(q.w, q.y);
    float e = 1.0e-10;
    return vec3(abs(q.z + (q.w - q.y) / (6.0 * d + e)), d / (q.x + e), q.x);
}

vec2 uv()
{
  return 0.5 * uvN  + 0.5;
}

float smin( float a, float b,float k)
{
    float h = clamp( 0.5+0.5*(b-a)/k, 0.0, 1.0 );
    return mix( b, a, h ) - k*h*(1.0-h);
}

float xsdTorus( vec3 p, vec2 t )
{
  vec2 q = vec2(length(p.xz)-t.x,p.y);
  return length(q)-t.y;
}
float ysdTorus( vec3 p, vec2 t )
{
  vec2 q = vec2(length(p.yz)-t.x,p.x);
  return length(q)-t.y;
}

float zsdTorus( vec3 p, vec2 t )
{
  vec2 q = vec2(length(p.xy)-t.x,p.z);
  return length(q)-t.y;
}

float torusBall(vec3 p, vec2 t )
{
    return smin(
        xsdTorus(p,t),
        smin(
            ysdTorus(p,t),
            zsdTorus(p,t),
            0.05),
        0.05);
}

vec3 opRep( vec3 p, vec3 c )
{
    vec3 q = mod(p,c)-0.5*c;
    return q;
}

float sceneSDF(vec3 p){

 vec3 q = opRep(p,vec3(2.0) );
float f = (sin(time*0.7)) * 25.;
float a = 20.;
vec3 offset = vec3(0.0,-0.2,sin(time)*0.1);
// return zsdTorus(p, vec2(0.3,0.2));
float d =  torusBall(p + offset, vec2(.4 -  abs(f)*0.005, abs(f)*0.005));

d += (sin(f*p.x)*
   sin(f*p.y)*
   sin(f*p.z)*0.03);

 d -= fbm(p * 035.,4)*0.03;
 return d;
}

vec3 estimateNormal(vec3 p) {
    float EPSILON = 0.001;
    return normalize(vec3(
        sceneSDF(vec3(p.x + EPSILON, p.y, p.z)) - sceneSDF(vec3(p.x - EPSILON, p.y, p.z)),
        sceneSDF(vec3(p.x, p.y + EPSILON, p.z)) - sceneSDF(vec3(p.x, p.y - EPSILON, p.z)),
        sceneSDF(vec3(p.x, p.y, p.z  + EPSILON)) - sceneSDF(vec3(p.x, p.y, p.z - EPSILON))
    ));
}

vec3 rayDirection(float fieldOfView, vec2 size, vec2 fragCoord) {
    vec2 xy = fragCoord - size / 2.0;
    float z = size.y / tan(radians(fieldOfView) / 2.0);
    return normalize(vec3(xy, -z));
}

mat4 viewMatrix(vec3 eye, vec3 center, vec3 up) {
    // Based on gluLookAt man page
    vec3 f = normalize(center - eye);
    vec3 s = normalize(cross(f, up));
    vec3 u = cross(s, f);
    return mat4(
        vec4(s, 0.0),
        vec4(u, 0.0),
        vec4(-f, 0.0),
        vec4(0.0, 0.0, 0.0, 1)
    );
}

void main () {
    // float smaller = min(resolution.x,resolution.y)
    float u = gl_FragCoord.x * 2.0 / resolution.x ;
    float v = gl_FragCoord.y * 2.0 / resolution.y ;
    vec2 st = vec2(u, v) - vec2(0.5);
    vec2 stN = uv();

    vec4 color = vec4(vec3(0.0,0.0,0.0), 0.0); // Sky color

    vec3 up =      vec3(0, 1, 0);
    vec3 right =   vec3(1, 0, 0);
    vec3 forward = vec3(0 ,0, 1);


    vec3 viewDir = rayDirection(45.0, vec2(1.0), st);
     vec3 eye = normalize(vec3(
      sin(time/4.+3.),// + mouse.x*4.,
      sin(time/4.+2.),// + mouse.y*4.,
      sin(time/4.+1.)
      ))*2.5;

    mat4 viewToWorld = viewMatrix(eye, vec3(0.0, 0.0, 0.0), vec3(0.0, 1.0, 0.0));

    vec3 worldDir = (viewToWorld * vec4(viewDir, 0.0)).xyz;


    vec3 ro = eye;
    vec3 rd = worldDir;
    float t = 0.3;
    const int maxSteps = 18;
    int found = 0;
    for(int i = 1; i < maxSteps; ++i)
    {
        vec3 p = ro + rd * t;
        float d = sceneSDF(p);

        if(d < 0.01)
        {
        //   float fi = float(i) / float(maxSteps);
          vec3 angle = estimateNormal(p);
          vec3 oil = angle*0.1;
        //   oil.r = fract(oil.r*2.0)*0.2;
          oil.r += time*0.1;
          oil.r = float( int(oil.r*9.) )/9. * 0.9,
          oil.g = 0.2;//s
          oil.b = 0.7;//v
          oil = hsv2rgb(oil);
          oil += dot(angle , up) * white*0.2;

          color = vec4(oil, 1.0) ; // Sphere color

          found = 1;
          break;
          
        }
        if(d>3.0){
            break;
        }

        t += d;
    }

    if(length(color) > 1.55){//2.5* noise((st*5000.)+time)){
        color = vec4(1.0);
        // color = vec4(0.,0.,0.,1.);
        
    }else{
        color = vec4(0.,0.,0.,0.);
    }

    float spread = 0.0075;
    vec2 jitter = vec2(spread, 0.00) * noise(st * 100.*time);
    jitter = jitter - vec2(spread*0.5,0.);
    // jitter *=0.;
    vec2 fall = vec2(0.0, spread*0.8) * (noise(st*1000.+time));
    // vec2 suction = vec2(0.);
    // vec2 push = (mouse / resolution) *0.5;
    // vec2

    vec2 sampleLoc = jitter + fall + stN;// + push;// + fall +
    sampleLoc = vec2(0.,1./resolution.y) + stN;// + push;// + fall + suction;
    //  sampleLoc = vec2(1./resolution.x,0.) + stN;// + push;// + fall + suction;

    vec4 g = texture2D(backBuffer, sampleLoc).rgba;
    if( length(g) < 0.1){
      g = texture2D(backBuffer, sampleLoc).rgba;
    }
    // color +=
    if(found==0 && st.y < 0.9){
        // color = vec4(vec3(1.0),1.0);
         color = g;
      color*=0.999;
    }
    gl_FragColor = color;
}`;

export default fShaderSource;
