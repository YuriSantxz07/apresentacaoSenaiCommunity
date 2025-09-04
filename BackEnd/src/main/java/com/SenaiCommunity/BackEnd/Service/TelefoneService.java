package com.SenaiCommunity.BackEnd.Service;

import com.SenaiCommunity.BackEnd.DTO.TelefoneDTO;
import com.SenaiCommunity.BackEnd.Entity.Telefone;
import com.SenaiCommunity.BackEnd.Entity.Usuario;
import com.SenaiCommunity.BackEnd.Repository.TelefoneRepository;
import com.SenaiCommunity.BackEnd.Repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class TelefoneService {

    @Autowired
    private TelefoneRepository telefoneRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    public TelefoneDTO salvar(TelefoneDTO dto) {
        Telefone telefone = new Telefone();
        telefone.setNumero(dto.getNumero());
        telefone.setTipo(dto.getTipo());

        Optional<Usuario> usuarioOpt = usuarioRepository.findById(dto.getUsuarioId());
        usuarioOpt.ifPresent(telefone::setUsuario);

        Telefone salvo = telefoneRepository.save(telefone);
        dto.setId(salvo.getId());
        return dto;
    }

    public List<TelefoneDTO> listarPorUsuario(Long usuarioId) {
        return telefoneRepository.findByUsuarioId(usuarioId)
                .stream()
                .map(t -> {
                    TelefoneDTO dto = new TelefoneDTO();
                    dto.setId(t.getId());
                    dto.setNumero(t.getNumero());
                    dto.setTipo(t.getTipo());
                    dto.setUsuarioId(t.getUsuario().getId());
                    return dto;
                })
                .collect(Collectors.toList());
    }

    public void deletar(Long id) {
        telefoneRepository.deleteById(id);
    }

    public TelefoneDTO buscarPorId(Long id) {
        return telefoneRepository.findById(id).map(t -> {
            TelefoneDTO dto = new TelefoneDTO();
            dto.setId(t.getId());
            dto.setNumero(t.getNumero());
            dto.setTipo(t.getTipo());
            dto.setUsuarioId(t.getUsuario().getId());
            return dto;
        }).orElse(null);
    }
}
