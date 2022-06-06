
export const setFinish = (finish: boolean) => {
    const finishEle = document.getElementById("finish");
    if (finishEle) {
        finishEle!.innerText = finish ? "👏 恭喜!" : "🤔 加油";
    }
};

export const afterDotDom = (x:Number,y:Number) => {
    const el = document.getElementById("point");
    el!.style.left = `${x}px`;
    el!.style.top = `${y}px`;
}
