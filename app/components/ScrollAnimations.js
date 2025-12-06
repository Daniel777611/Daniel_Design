"use client";

// 全站禁用滚动动态与进度条，恢复纯静态布局
// 之前这些滚动动画会对 section 做 translate/scale，导致顶部出现额外空白。
// 现在组件只返回 null，不再对 DOM 做任何操作。

export default function ScrollAnimations() {
    return null;
}
