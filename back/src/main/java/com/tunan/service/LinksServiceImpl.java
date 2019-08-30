package com.tunan.service;

import com.tunan.dao.LinksDao;
import com.tunan.domain.Links;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service(value = "LinksService")
public class LinksServiceImpl implements LinksService {

    @Autowired
    private LinksDao linksDao;
    @Override
    public List<Links> getLinks(int kid) {
        return linksDao.getLinks(kid);
    }

    @Override
    public List<Links> getAllLinks(Integer start, Integer num) {
        return linksDao.getAllLinks(start,num);
    }
}
