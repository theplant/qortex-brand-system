<template>
  <div class="slidev-layout qx-content">
    <div class="qx-wordmark qx-content__mark">QORTEX</div>
    <div class="qx-content__body">
      <slot />
    </div>
  </div>
</template>

<style>
.qx-content {
  background: var(--bg);
  color: var(--text);
  padding: 0;
  height: 100%;
  display: flex;
  flex-direction: column;
}
.qx-content__mark {
  padding: 48px 80px 0;
}
.qx-content__body {
  padding: 24px 80px 80px;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.qx-content h2 {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 64px;
  line-height: 1.1;
  letter-spacing: -0.02em;
  color: var(--text);
  margin: 0 0 40px;
  max-width: 1500px;
}
.qx-content p,
.qx-content li {
  font-family: var(--font-body);
  font-size: 30px;
  line-height: 1.5;
  color: var(--text2);
  max-width: 1500px;
}
.qx-content ul,
.qx-content ol {
  margin: 0;
  padding-left: 32px;
}
.qx-content li {
  margin: 16px 0;
}
.qx-content strong { color: var(--text); font-weight: 600; }
.qx-content em { color: var(--cyan-bright); font-style: italic; }
[lang="ja"] .qx-content h2 {
  font-family: var(--font-jp);
  font-weight: 700;
  font-size: 56px;
  letter-spacing: 0;
  line-height: 1.5;
  word-break: keep-all;
  overflow-wrap: anywhere;
}
[lang="ja"] .qx-content em { font-style: normal; }
</style>
