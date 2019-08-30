package com.tunan.dao;

import com.tunan.domain.Links;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface LinksDao{
    public List<Links> getLinks(int kid);
    public List<Links> getAllLinks(@Param("start") Integer start, @Param("num") Integer num);
}
