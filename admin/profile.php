<?php
require_once __DIR__ . '/auth.php';
$pageTitle = 'Profile';
$active = 'profile';
require __DIR__ . '/includes/header.php';
?>
<div class="grid-2">
  <div class="card pad">
    <h3><?= e(__('Account')) ?></h3>
    <form data-action="update_profile" data-reload>
      <div class="form-grid">
        <div class="field"><label><?= e(__('Username')) ?></label><input name="username" value="<?= e($ADMIN['username']) ?>" required></div>
        <div class="field"><label><?= e(__('Email')) ?></label><input name="email" type="email" value="<?= e($ADMIN['email']) ?>"></div>
      </div>
      <div class="modal-foot"><button class="btn btn-primary" type="submit"><?= e(__('Save profile')) ?></button></div>
    </form>
  </div>
  <div class="card pad">
    <h3><?= e(__('Change password')) ?></h3>
    <form data-action="change_password" data-reset>
      <div class="form-grid">
        <div class="field full">
          <label><?= e(__('Current password')) ?></label>
          <div class="password-wrapper">
            <input name="current" type="password" autocomplete="current-password" required>
            <button type="button" class="password-toggle-btn" aria-label="<?= e(current_lang() === 'ar' ? 'إظهار / إخفاء كلمة المرور' : 'Show / hide password') ?>" title="<?= e(current_lang() === 'ar' ? 'إظهار / إخفاء كلمة المرور' : 'Show / hide password') ?>">
              <svg class="eye-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path><circle cx="12" cy="12" r="3"></circle></svg>
              <svg class="eye-off-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display: none;"><path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"></path><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"></path><path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"></path><line x1="2" y1="2" x2="22" y2="22"></line></svg>
            </button>
          </div>
        </div>
        <div class="field">
          <label><?= e(__('New password (min 8)')) ?></label>
          <div class="password-wrapper">
            <input name="new" type="password" autocomplete="new-password" required minlength="8">
            <button type="button" class="password-toggle-btn" aria-label="<?= e(current_lang() === 'ar' ? 'إظهار / إخفاء كلمة المرور' : 'Show / hide password') ?>" title="<?= e(current_lang() === 'ar' ? 'إظهار / إخفاء كلمة المرور' : 'Show / hide password') ?>">
              <svg class="eye-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path><circle cx="12" cy="12" r="3"></circle></svg>
              <svg class="eye-off-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display: none;"><path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"></path><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"></path><path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"></path><line x1="2" y1="2" x2="22" y2="22"></line></svg>
            </button>
          </div>
        </div>
        <div class="field">
          <label><?= e(__('Confirm new password')) ?></label>
          <div class="password-wrapper">
            <input name="confirm" type="password" autocomplete="new-password" required>
            <button type="button" class="password-toggle-btn" aria-label="<?= e(current_lang() === 'ar' ? 'إظهار / إخفاء كلمة المرور' : 'Show / hide password') ?>" title="<?= e(current_lang() === 'ar' ? 'إظهار / إخفاء كلمة المرور' : 'Show / hide password') ?>">
              <svg class="eye-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path><circle cx="12" cy="12" r="3"></circle></svg>
              <svg class="eye-off-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display: none;"><path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"></path><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"></path><path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"></path><line x1="2" y1="2" x2="22" y2="22"></line></svg>
            </button>
          </div>
        </div>
      </div>
      <div class="modal-foot"><button class="btn btn-primary" type="submit"><?= e(__('Update password')) ?></button></div>
    </form>
  </div>
</div>
<?php require __DIR__ . '/includes/footer.php'; ?>