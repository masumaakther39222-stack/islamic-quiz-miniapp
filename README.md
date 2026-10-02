# Islamic Quiz Telegram Mini App

## চালানোর নিয়ম
1. Node.js 18+ ইনস্টল করুন।
2. এই ফোল্ডারে terminal খুলে `npm install` চালান।
3. `.env.example` কপি করে `.env` বানান।
4. `ADMIN_KEY` নিজের secret key দিন।
5. `npm start` চালান।
6. HTTPS URL-এ deploy করুন।
7. BotFather → আপনার bot → Bot Settings → Menu Button থেকে Mini App URL দিন।

## Admin API
Quiz যোগ করতে:
POST /api/admin/quiz
Header: x-admin-key: YOUR_ADMIN_KEY

Body:
{
  "question":"প্রশ্ন",
  "options":["A","B","C","D"],
  "answer":2
}

Quiz delete:
DELETE /api/admin/quiz/ID

## Monetag
`.env`-এ `MONETAG_ZONE_ID` রাখা হয়েছে। Monetag-এর বর্তমান SDK/code অনুযায়ী frontend-এ তাদের official ad script যোগ করে Rewarded/Interstitial call বসাতে হবে। Zone ID না পাওয়া পর্যন্ত বিজ্ঞাপন চালু হবে না।
