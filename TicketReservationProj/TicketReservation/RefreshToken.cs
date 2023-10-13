/*
 * File: RefreshToken.cs
 * Description: Represents a refresh token used for token-based authentication.
 */

namespace JwtWebApiTutorial
{
    public class RefreshToken
    {
        public string Token { get; set; } = string.Empty;
        public DateTime Created { get; set; } = DateTime.Now;
        public DateTime Expires { get; set; }
    }
}
