import { AuthService } from '../services/auth.js';

export class AuthController {
  static async signUp(req, res) {
    try {
      const { email, password } = req.body;
      const user = await AuthService.signUp(email, password);
      res.status(201).json({ message: 'User registered successfully', user });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async signIn(req, res) {
    try {
      const { email, password } = req.body;
      const user = await AuthService.signIn(email, password);
      res.json({ token: user.session.access_token });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}
