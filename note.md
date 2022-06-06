[基于Three.js的碰撞检测为何使用Vector.applyMatrix4()的原因进行分析](https://blog.csdn.net/jiljdlawjdlada/article/details/109203364)  
// 只检测了顶点射线的相交
```js
var geo1 = new THREE.BoxGeometry(80, 80, 80)
var material = new THREE.MeshLambertMaterial({
  color: 0xeff444
})
var geo2 = new THREE.BoxGeometry(80, 80, 80)
var mesh1 = new THREE.Mesh(geo1, material)
var mesh2 = new THREE.Mesh(geo2, material)
mesh2.position.x = 200 // 物体2偏移200


    var originPoint = mesh1.position.clone();
    for (var vertexIndex = 0; vertexIndex < mesh1.geometry.vertices.length; vertexIndex++) {
      // 顶点原始坐标
      var localVertex = mesh1.geometry.vertices[vertexIndex].clone();
      // 顶点经过变换后的坐标 将顶点-物体坐标 应用上物体的变换矩阵 得到 顶点-世界坐标
      var globalVertex = localVertex.applyMatrix4(mesh1.matrix);
      // 获得由中心指向顶点的向量
      var directionVector = globalVertex.sub(mesh1.position);
      // 将方向向量初始化,并发射光线
      var ray = new THREE.Raycaster(originPoint, directionVector.clone().normalize());
      // 检测射线与多个物体的相交情况
      // 如果为true，它还检查所有后代。否则只检查该对象本身。缺省值为false
      var collisionResults = ray.intersectObjects([mesh2], true);
      // 如果返回结果不为空，且交点与射线起点的距离小于物体中心至顶点的距离，则发生了碰撞
      if (collisionResults.length > 0 && collisionResults[0].distance < directionVector.length()) {
        crash = true;   // crash 是一个标记变量
        alert("发生了碰撞")
      }
    }

```

[线性代数导学（六）：点积与叉积的作用](https://zhuanlan.zhihu.com/p/430854553)  
两个向量点积是投影长度??  
两向量叉积得到垂直的向量


https://docs.github.com/cn/get-started/writing-on-github/working-with-advanced-formatting/writing-mathematical-expressions

- Vector.dot  
  $A\cdot B = |A||B|cos(\theta)$ 一条向量乘以了一条向量的投影  
- Vector3.multiply 
  得到与两个向量都垂直的向量

