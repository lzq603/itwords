package com.tunan.service;

import com.tunan.domain.Links;

import java.util.List;

public interface LinksService {
    /*一个id会对应一个乃至多个链接*/
    public List<Links> getLinks(int kid);
    public List<Links> getAllLinks(Integer start, Integer num);


}
