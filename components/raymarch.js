const fShaderSource = `
precision mediump float;
const float pi = 3.141592653589793238462643383;
uniform float time;
uniform vec2 mouse;
uniform vec2 resolution;
uniform sampler2D backBuffer;
uniform sampler2D channel1;
uniform sampler2D channel2;
varying vec2 uvN;
vec2 uv()
{
  return 0.5 * uvN  + 0.5;
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
vec3 hsv2rgb(vec3 c)
{
    vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
    vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
    return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
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
float f = 3.;//(sin(time) + 1.) * 5.;
float a = 20.;
return torusBall(p, vec2(.5, .05))
 + sin((f)*p.x)*
   sin((f)*p.y)*
   sin((f)*p.z)*0.1;
}

vec3 estimateNormal(vec3 p) {
    float EPSILON = 0.00001;
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
    vec2 stN = gl_FragCoord.xy;

    vec3 up =      vec3(0, 1, 0);
    vec3 right =   vec3(1, 0, 0);
    vec3 forward = vec3(0 ,0, 1);


    vec3 viewDir = rayDirection(45.0, vec2(1.0), st);
     vec3 eye = normalize(vec3(sin(time/4.+3.),
                               sin(time/4.+2.),
                               sin(time/4.+1.)
                          ))*2.5;

    mat4 viewToWorld = viewMatrix(eye, vec3(0.0, 0.0, 0.0), vec3(0.0, 1.0, 0.0));

    vec3 worldDir = (viewToWorld * vec4(viewDir, 0.0)).xyz;


    vec3 ro = eye;
    vec3 rd = worldDir;
    vec4 color = vec4(vec3(0.0,0.0,0.0), 0.0); // Sky color
    float t = 0.3;
    const int maxSteps = 50;
    for(int i = 1; i < maxSteps; ++i)
    {
        vec3 p = ro + rd * t;
        float d = sceneSDF(p);

        if(d < 0.01)
        {
          float fi = float(i) / float(maxSteps);
          vec2 angle = vec2(estimateNormal(p));
          color = vec4(estimateNormal(p) * fi, 1.0) ; // Sphere color
          color.a = 0.9;

          break;
        }

        t += d;
    }
    vec4 g = texture2D(backBuffer, uv()).rgba;
    // color +=
    color = max(color, g);
    color *= 0.9;
    // color += g;
    gl_FragColor = color;
}`;

export default fShaderSource;
