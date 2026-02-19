import {ChangeDetectionStrategy, Component, computed, effect, signal} from '@angular/core';
import { JsonPipe } from '@angular/common';
import {
  form,
  FormField,
  required,
  email,
  minLength,
  validate,
  disabled,
  hidden,
  submit,
  requiredError,
} from '@angular/forms/signals';

interface ProfileData {
  name: string;
  email: string;
  bio: string;
}

interface PasswordData {
  password: string;
  confirmPassword: string;
}

interface SettingsData {
  receiveNewsletter: boolean;
  newsletterEmail: string;
  showBio: boolean;
  bio: string;
}

interface TodoItem {
  text: string;
  done: boolean;
}

@Component({
  selector: 'app-signal-forms-page',
  imports: [FormField, JsonPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './signal-forms.page.html',
  styleUrl: './signal-forms.page.css',
})
export class SignalFormsPage {
  // Section 1: Basic Signal Form
  readonly profileModel = signal<ProfileData>({
    name: '',
    email: '',
    bio: '',
  });

  readonly profileForm = form(this.profileModel, (profile) => {
    required(profile.name, { message: 'Name is required' });
    required(profile.email, { message: 'Email is required' });
    email(profile.email, { message: 'Enter a valid email' });
    minLength(profile.bio, 10, { message: 'Bio must be at least 10 characters' });
  });

  // Section 2: Custom Cross-field Validation
  readonly passwordModel = signal<PasswordData>({
    password: '',
    confirmPassword: '',
  });

  readonly passwordForm = form(this.passwordModel, (pw) => {
    required(pw.password, { message: 'Password is required' });
    minLength(pw.password, 6, { message: 'Password must be at least 6 characters' });
    required(pw.confirmPassword, { message: 'Please confirm password' });
    validate(pw.confirmPassword, ({ value, valueOf }) => {
      if (value() && value() !== valueOf(pw.password)) {
        return requiredError({ message: 'Passwords do not match' });
      }
      return undefined;
    });
  });

  passwordFormEffect = effect(() => {
    console.log("password", this.passwordForm.password().value())
    //const form = this.passwordForm()
    // console.log("form", form.value())
  })

  // Section 3: Conditional Logic (disabled / hidden)
  readonly settingsModel = signal<SettingsData>({
    receiveNewsletter: false,
    newsletterEmail: '',
    showBio: true,
    bio: '',
  });

  readonly settingsForm = form(this.settingsModel, (s) => {
    disabled(s.newsletterEmail, ({ valueOf }) => !valueOf(s.receiveNewsletter));
    required(s.newsletterEmail, { message: 'Newsletter email is required' });
    email(s.newsletterEmail, { message: 'Enter a valid email' });

    hidden(s.bio, ({ valueOf }) => !valueOf(s.showBio));
    minLength(s.bio, 5, { message: 'Bio must be at least 5 characters' });
  });

  // Section 4: Array Fields
  readonly todosModel = signal<{ items: TodoItem[] }>({
    items: [{ text: 'Learn Signal Forms', done: false }],
  });

  readonly todosForm = form(this.todosModel);
  readonly newTodoText = signal('');

  addTodo(): void {
    const text = this.newTodoText().trim();
    if (!text) return;
    this.todosModel.update((m) => ({
      ...m,
      items: [...m.items, { text, done: false }],
    }));
    this.newTodoText.set('');
  }

  removeTodo(index: number): void {
    this.todosModel.update((m) => ({
      ...m,
      items: m.items.filter((_, i) => i !== index),
    }));
  }

  // Section 5: Form Submission
  readonly submittedProfile = signal<ProfileData | null>(null);

  readonly profileValid = computed(() => this.profileForm().valid());
  readonly profileSubmitting = computed(() => this.profileForm().submitting());

  async onSubmitProfile(): Promise<void> {
    await submit(this.profileForm, async () => {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      this.submittedProfile.set(this.profileModel());
      return undefined;
    });
  }

  resetProfile(): void {
    this.profileModel.set({ name: '', email: '', bio: '' });
    this.profileForm().reset();
    this.submittedProfile.set(null);
  }
}
