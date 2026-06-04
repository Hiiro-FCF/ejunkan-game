# e junkan サステナブルファッション学習ゲーム

## 技術スタック
- **フロントエンド**: Next.js 14 (React)
- **データベース**: Supabase
- **デプロイ**: Vercel
- **対応**: Web・スマホブラウザ両対応

---

## セットアップ手順

### 1. Supabase のセットアップ

1. [supabase.com](https://supabase.com) でアカウント作成・プロジェクト作成
2. `ejunkan_supabase_schema.sql` の内容を **Supabase > SQL Editor** に貼り付けて実行
3. **Settings > API** から以下をコピーする
   - `Project URL`
   - `anon public` キー

### 2. 環境変数の設定

`.env.local.example` をコピーして `.env.local` を作成し、値を入力:

```bash
cp .env.local.example .env.local
```

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxxxxxxxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.xxxxxxxx
```

### 3. ローカル起動

```bash
npm install
npm run dev
```

ブラウザで `http://localhost:3000` を開く。

---

## Vercel へのデプロイ

### 方法A: GitHub連携（推奨）

1. このプロジェクトを GitHub にプッシュ
2. [vercel.com](https://vercel.com) にログイン
3. **New Project** → GitHubリポジトリを選択
4. **Environment Variables** に以下を追加:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
5. **Deploy** をクリック

### 方法B: Vercel CLI

```bash
npm install -g vercel
vercel login
vercel --prod
```

デプロイ時に環境変数を聞かれるので入力する。

---

## プロジェクト構成

```
src/
  pages/
    _app.js          # グローバル設定
    index.js         # メインページ（全画面統合）
  components/        # 将来的なコンポーネント分割用
  data/
    questions.js     # 全問題データ（20問・5ステージ）
  hooks/
    usePlayer.js     # プレイヤー状態管理
  lib/
    supabase.js      # Supabase設定・定数
    db.js            # DB操作関数
  styles/
    globals.css      # グローバルCSS
```

---

## シーズンリセット（毎年1月1日）

Supabase の **SQL Editor** で以下を実行:

```sql
SELECT reset_season('2025', '2026');
```

または Supabase の **Database > Functions** からスケジュール実行を設定する。

---

## 問題の追加・更新

`src/data/questions.js` の `ALL_QUESTIONS` 配列に問題を追加する。

各問題の形式:
```js
{
  id: 'sXqY',        // ステージ番号・問題番号
  stage: 1,          // 1〜5
  theme: 'テーマ名',
  versions: {
    kid:   { text: '問題文', choices: ['A','B','C'], answer: 0 },
    teen:  { text: '問題文', choices: ['A','B','C','D'], answer: 0 },
    adult: { text: '問題文', choices: ['A','B','C','D'], answer: 0 },
  },
  explanation: {
    kid:   '解説文',
    teen:  '解説文',
    adult: '解説文',
  },
  source: '引用元',
}
```

---

## e junkan との連携

クーポン使用確認は Supabase の `coupon_status` ビューで確認できる:

```sql
SELECT * FROM coupon_status WHERE code = 'EJNK-GLD-2025-XXXXX';
```

使用済みフラグの更新は `coupons` テーブルの `used` カラムで管理。
