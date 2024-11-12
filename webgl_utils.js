
function compileShader(gl,src,type) {
    let shader = createShader(type)
    gl.shaderSource(shader,src)
    gl.compileShader(shader)
    if (!gl.getShaderParameter(shader,gl.COMPILE_STATUS))
        throw Error(gl.getShaderInfoLog(shader))
    return shader
}
function shaderProgram(gl,vs,fs) {
    let program = gl.createProgram()
    gl.attachShader(program,vs)
    gl.attachShader(program,fs)
    gl.linkProgram(program)
    if (!gl.getProgramParameter(program,gl.LINK_STATUS))
        throw Error(gl.getProgramInfoLog(program))
    gl.useProgram(program)
    return program
}
function vertexBuffer(gl,vertices,sp,posName) {
    let vertexBuffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW)
    let posLoc = gl.getAttribLocation(sp, posName)
    gl.vertexAttribPointer(posLoc, 3, gl.FLOAT, false, 0, 0)
    gl.enableVertexAttribArray(posLoc)
    return vertexBuffer
}
function doMatrices(canvas,gl,sp,viewMatName,projMatName) {
    let viewMatLoc = gl.getUniformLocation(sp,viewMatName)
    let projMatLoc = gl.getUniformLocation(sp,projMatName)
    let projMat = mat4.create()
    mat4.perspective(projMat,Math.PI / 4,canvas.width / canvas.height, 0.1, 100.0)
    let viewMat = mat4.create()
    mat4.translate(viewMat,viewMat,[0,0,-3])
    gl.uniformMatrix4fv(viewMatLoc, false, viewMat);
    gl.uniformMatrix4fv(projMatLoc, false, projMat);
    return {viewMat,projMat,viewMatLoc,projMatLoc}
}
function draw(gl,index,vertexCount) {
    gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT)
    gl.drawArrays(gl.TRIANGLES,index,vertexCount)
}