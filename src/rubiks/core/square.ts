import {Shape, ShapeGeometry, MeshBasicMaterial, Mesh, Color, Object3D, Group, Plane, PlaneGeometry, DoubleSide, TextureLoader, Vector3} from "three";
import {CubeElement} from "./cubeData";

const textureLoader = new TextureLoader();

/**
 *  把每一小个方面构造为 Object3D 物体
 * */

export const createSquare = (color: Color, element: CubeElement) => {
    // http://www.webgl3d.cn/threejs/docs/#api/zh/extras/core/Shape
    // 用Vector2数组定义一个二维图形
    const squareShape = new Shape();
    const x = 0, y = 0;
    // top
    squareShape.moveTo(x - 0.4, y + 0.5);
    squareShape.lineTo(x + 0.4, y + 0.5);
    squareShape.bezierCurveTo(x + 0.5, y + 0.5, x + 0.5, y + 0.5, x + 0.5, y + 0.4); //弧线 贝塞尔曲线

    // right
    squareShape.lineTo(x + 0.5, y - 0.4);
    squareShape.bezierCurveTo(x + 0.5, y - 0.5, x + 0.5, y - 0.5, x + 0.4, y - 0.5);

    // bottom
    squareShape.lineTo(x - 0.4, y - 0.5);
    squareShape.bezierCurveTo(x - 0.5, y - 0.5, x - 0.5, y - 0.5, x - 0.5, y - 0.4);

    // left
    squareShape.lineTo(x - 0.5, y + 0.4);
    squareShape.bezierCurveTo(x - 0.5, y + 0.5, x - 0.5, y + 0.5, x - 0.4, y + 0.5);

    const geometry = new ShapeGeometry(squareShape); // 创建单面的几何体 http://www.webgl3d.cn/threejs/docs/#api/zh/geometries/ShapeGeometry
    const material = new MeshBasicMaterial({ color }); // 网格材质 就只有着色 http://www.webgl3d.cn/threejs/docs/#api/zh/materials/MeshBasicMaterial
    const mesh = new Mesh(geometry, material); // 创建网格模型 基类Object3D http://www.webgl3d.cn/threejs/docs/#api/zh/objects/Mesh
    mesh.scale.set(0.9, 0.9, 0.9); // 缩放

    const square = new SquareMesh(element); // Object3D + CubeElement
    square.add(mesh); // 使用 Object3D 来组合对象 (都是一般最好使用 Group)

    const mat2 = new MeshBasicMaterial({
        color: "black",
        side: DoubleSide // 双面渲染
    });

    const plane = new Mesh(geometry, mat2);
    plane.position.set(0, 0, -0.01); // 移动靠后一点，防止重叠造成闪烁
    square.add(plane);

    const posX = element.pos.x;
    const posY = element.pos.y;
    const posZ = element.pos.z;
    square.position.set(posX, posY, posZ); // 设置位置

    if (element.withLogo) {
        // 纹理加载器 http://www.webgl3d.cn/threejs/docs/#api/zh/loaders/TextureLoader 
        // 纹理是贴图 颜色 图案
        // 材质包括反射系数 折射率
        //但是uv是在geometry中的
        textureLoader.load("https://pengfeiw.github.io/assests/logo/w.png", (texture) => {
            const geo2 = new PlaneGeometry(1, 1, 1); // 平面几何体
            const mat3 = new MeshBasicMaterial({ // 把纹理添加到材质上
                map: texture,
                transparent: true
            });
            const avatarPlane = new Mesh(geo2, mat3);
            avatarPlane.position.set(0, 0, 0.01); // 位置
            avatarPlane.scale.set(0.8, 0.8, 0.8); // 缩放
            square.add(avatarPlane);
        });
    }

    square.lookAt(element.pos.clone().add(element.normal)); // 旋转物体使其在世界空间中面朝一个点 还是方向? 为什么要相加?
    return square;
};

export class SquareMesh extends Object3D {
    public element: CubeElement;
    public constructor(element: CubeElement) {
        super();
        this.element = element;
    }
}
