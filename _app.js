*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html, body {
  font-family: 'Hiragino Sans', 'Noto Sans JP', 'Yu Gothic', sans-serif;
  background: #fafafa;
  color: #1a1a1a;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* スマホ基準・最大幅制限 */
.page-container {
  min-height: 100vh;
  min-height: 100dvh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1.5rem 1rem;
  background: #fafafa;
}

.content-wrap {
  width: 100%;
  max-width: 480px;
}

/* タッチデバイスでボタンのアクティブ状態 */
button:active {
  transform: scale(0.98);
}

/* スクロールバー非表示（スマホ） */
::-webkit-scrollbar {
  display: none;
}

/* セーフエリア対応（iPhoneノッチ等） */
.safe-bottom {
  padding-bottom: env(safe-area-inset-bottom, 0);
}

/* アニメーション：モーション低減設定対応 */
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}

/* タイマー円弧アニメーション */
@keyframes timerPulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.7; }
}

/* ランクアップバナー */
@keyframes rankUpIn {
  from { opacity: 0; transform: translateY(-12px) scale(0.96); }
  to   { opacity: 1; transform: translateY(0)     scale(1); }
}

.rank-up-banner {
  animation: rankUpIn 0.4s ease-out;
}

/* フォーカスリング（アクセシビリティ） */
button:focus-visible {
  outline: 2px solid #1D9E75;
  outline-offset: 2px;
}
