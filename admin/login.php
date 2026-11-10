<?php
require_once __DIR__ . '/config.php';
ensure_default_admin();

if (!empty($_SESSION['admin_id'])) { header('Location: index.php'); exit; }

$error = '';
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (($_SESSION['lock_until'] ?? 0) > time()) {
        $error = __('login_too_many_err');
    } elseif (!hash_equals(csrf_token(), (string)($_POST['csrf'] ?? ''))) {
        $error = __('login_session_exp_err');
    } else {
        $u = trim((string)($_POST['username'] ?? ''));
        $p = (string)($_POST['password'] ?? '');
        $a = row('SELECT * FROM admins WHERE username = ?', [$u]);
        if ($a && password_verify($p, $a['password_hash'])) {
            session_regenerate_id(true);
            $_SESSION['admin_id'] = (int)$a['id'];
            $_SESSION['last'] = time();
            $_SESSION['fails'] = 0;
            unset($_SESSION['csrf']);
            log_activity('Logged in', $u);
            header('Location: index.php');
            exit;
        }
        $_SESSION['fails'] = ($_SESSION['fails'] ?? 0) + 1;
        if ($_SESSION['fails'] >= 5) { $_SESSION['lock_until'] = time() + 60; $_SESSION['fails'] = 0; }
        $error = __('login_invalid_err');
    }
}
$currentParams = $_GET;
$targetLang = current_lang() === 'ar' ? 'en' : 'ar';
$currentParams['lang'] = $targetLang;
$langSwitchUrl = '?' . http_build_query($currentParams);
?>
<!DOCTYPE html>
<html lang="<?= e(current_lang()) ?>" dir="<?= is_rtl() ? 'rtl' : 'ltr' ?>">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title><?= e(__('Sign in')) ?> · <?= e(__('saud_trading')) ?></title>
  <link rel="icon" type="image/x-icon" href="favicon.ico">
  <link rel="shortcut icon" type="image/x-icon" href="favicon.ico">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="assets/css/dashboard.css?v=<?= filemtime(__DIR__ . '/assets/css/dashboard.css') ?>">
  <style>
    .password-wrapper {
      position: relative;
      display: flex;
      align-items: center;
      width: 100%;
    }
    .password-wrapper input {
      padding-inline-end: 44px !important;
    }
    .password-toggle-btn {
      position: absolute;
      inset-inline-end: 8px;
      background: transparent;
      border: none;
      padding: 6px;
      margin: 0;
      cursor: pointer;
      color: #8c98a9;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 8px;
      transition: color 0.18s ease, background-color 0.18s ease;
    }
    .password-toggle-btn:hover {
      color: var(--navy, #0d2148);
      background-color: rgba(13, 33, 72, 0.06);
    }
    .password-toggle-btn:focus-visible {
      outline: 2px solid var(--gold, #b6873f);
    }
  </style>
</head>
<body class="login-body">
  <div class="bg-orbs"><span></span><span></span><span></span></div>
  <main class="login-card glow">
    <div style="display:flex; justify-content:flex-end; margin-bottom: 10px;">
      <a class="btn btn-sm lang-switch-btn" href="<?= e($langSwitchUrl) ?>" style="display:inline-flex; align-items:center; gap:6px; font-weight:600; font-size:12px; padding:4px 10px; border-radius:20px;">
        <span><?= current_lang() === 'ar' ? 'English' : 'العربية' ?></span>
      </a>
    </div>
    <div class="logo-mark big">S</div>
    <h1><?= e(__('saud_trading')) ?></h1>
    <p class="muted"><?= e(__('sign_in_title')) ?></p>
    <?php if ($error): ?><div class="alert"><?= e($error) ?></div><?php endif; ?>
    <form method="post" id="loginForm" novalidate>
      <input type="hidden" name="csrf" value="<?= e(csrf_token()) ?>">
      <div class="field"><label for="u"><?= e(__('Username')) ?></label>
        <input id="u" name="username" autocomplete="username" required autofocus></div>
      <div class="field">
        <label for="p"><?= e(__('Password')) ?></label>
        <div class="password-wrapper">
          <input id="p" name="password" type="password" autocomplete="current-password" required>
          <button type="button" id="togglePassword" class="password-toggle-btn" aria-label="<?= e(current_lang() === 'ar' ? 'إظهار / إخفاء كلمة المرور' : 'Show / hide password') ?>" title="<?= e(current_lang() === 'ar' ? 'إظهار / إخفاء كلمة المرور' : 'Show / hide password') ?>">
            <svg class="eye-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path>
              <circle cx="12" cy="12" r="3"></circle>
            </svg>
            <svg class="eye-off-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display: none;">
              <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"></path>
              <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"></path>
              <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"></path>
              <line x1="2" y1="2" x2="22" y2="22"></line>
            </svg>
          </button>
        </div>
      </div>
      <div class="alert" id="clientErr" hidden><?= e(__('login_prompt_err')) ?></div>
      <button class="btn btn-primary block" type="submit"><?= e(__('Sign in')) ?></button>
    </form>
  </main>
  <script>
    const toggleBtn = document.getElementById('togglePassword');
    const pwdInput = document.getElementById('p');
    if (toggleBtn && pwdInput) {
      const eyeIcon = toggleBtn.querySelector('.eye-icon');
      const eyeOffIcon = toggleBtn.querySelector('.eye-off-icon');
      toggleBtn.addEventListener('click', function () {
        const isPassword = pwdInput.type === 'password';
        pwdInput.type = isPassword ? 'text' : 'password';
        eyeIcon.style.display = isPassword ? 'none' : 'block';
        eyeOffIcon.style.display = isPassword ? 'block' : 'none';
        pwdInput.focus();
      });
    }

    document.getElementById('loginForm').addEventListener('submit', function (e) {
      if (!this.username.value.trim() || !this.password.value) {
        e.preventDefault();
        document.getElementById('clientErr').hidden = false;
      }
    });
  </script>
</body>
</html>