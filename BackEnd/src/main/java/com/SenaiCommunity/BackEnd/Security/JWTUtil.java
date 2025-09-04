package com.SenaiCommunity.BackEnd.Security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import javax.crypto.SecretKey;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import io.jsonwebtoken.JwtParser;
import java.util.Base64;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Component
public class JWTUtil {

    @Value("${jwt.secret}")
    private String secret;

    @Value("${jwt.expiration}")
    private Long expiration;

    private SecretKey getSigningKey() {
        byte[] keyBytes = Base64.getDecoder().decode(secret);
        return Keys.hmacShaKeyFor(keyBytes);
    }

    public String gerarToken(UserDetails userDetails) {
        String role = userDetails.getAuthorities().stream()
                .findFirst() // Se o usuário tiver múltiplas, pegue a primeira
                .map(GrantedAuthority::getAuthority)
                .orElse("ROLE_USER");

        return Jwts.builder()
                .subject(userDetails.getUsername())
                .claim("role", role)
                .expiration(new Date(System.currentTimeMillis() + expiration))
                .signWith(getSigningKey())
                .compact();
    }

    public String getRoleDoToken(String token) {
        Claims claims = validarToken(token);
        return claims != null ? claims.get("role", String.class) : null;
    }

    public String getEmailDoToken(String token) {
        Claims claims = validarToken(token);
        return claims != null ? claims.getSubject() : null;
    }


    public Claims validarToken(String token) {
        try {
            JwtParser parser = Jwts.parser().verifyWith(getSigningKey()).build();
            return parser.parseSignedClaims(token).getPayload();
        } catch (Exception e) {
            System.out.println("Erro ao validar token: " + e.getMessage());
            return null;
        }
    }

    public Claims getClaims(String token) {
        return validarToken(token);
    }

}
